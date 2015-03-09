import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import sun.util.logging.resources.logging;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class Client implements Runnable {

    private List<String> history = new ArrayList<String>();
    private MessageExchange messageExchange = new MessageExchange();
    private String host;
    private Integer port;
    private static PrintWriter log;

    public Client(String host, Integer port) {
        this.host = host;
        this.port = port;
        loggin(whatIsTime(),"request begin");
    }

    public static void loggin(String date, String event) {
        log.println(date+" "+event);
        log.flush();
    }
    public static String whatIsTime() {
        Date now = new Date();

        DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
        String s = formatter.format(now);
        return s;
    }

    public static void main(String[] args) throws IOException {
        log = new PrintWriter(new FileWriter("clientlog.txt"));
        if (args.length != 2)
            System.out.println("Usage: java ChatClient host port");
        else {
            System.out.println("Connection to server...");
            String serverHost = args[0];
            Integer serverPort = Integer.parseInt(args[1]);
            Client client = new Client(serverHost, serverPort);
            new Thread(client).start();
            System.out.println("Connected to server: " + serverHost + ":" + serverPort);
            client.listen();
        }
    }

    private HttpURLConnection getHttpURLConnection() throws IOException {
        URL url = new URL("http://" + host + ":" + port + "/chat?token=" + messageExchange.getToken(history.size()));
        loggin(whatIsTime(),"get URL");
        return (HttpURLConnection) url.openConnection();
    }

    public List<String> getMessages() {
        List<String> list = new ArrayList<String>();
        HttpURLConnection connection = null;
        loggin(whatIsTime()," try get messages from server");
        try {
            connection = getHttpURLConnection();
            connection.connect();
            String response = messageExchange.inputStreamToString(connection.getInputStream());
            JSONObject jsonObject = messageExchange.getJSONObject(response);
            JSONArray jsonArray = (JSONArray) jsonObject.get("messages");
            for (Object o : jsonArray) {
                System.out.println(o);
                list.add(o.toString());
            }
            loggin(whatIsTime(),"history size"+list.size());
        } catch (IOException e) {
            System.err.println("ERROR: " + e.getMessage());
        } catch (ParseException e) {
            System.err.println("ERROR: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

        return list;
    }

    public void sendMessage(String message) {
        HttpURLConnection connection = null;
        try {
            loggin(whatIsTime(),"newUrl");
            connection = getHttpURLConnection();
            loggin(whatIsTime(),"get connection URL when send message");
            connection.setDoOutput(true);

            connection.setRequestMethod("POST");

            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(messageExchange.getClientSendMessageRequest(message));
            loggin(whatIsTime(),"kodirovka");
            wr.flush();
            wr.close();

            connection.getInputStream();

        } catch (IOException e) {
            System.err.println("ERROR: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public void listen() {
        while (true) {
            List<String> list = getMessages();

            if (list.size() > 0) {
                history.addAll(list);
            }


            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("ERROR: " + e.getMessage());
            }
        }
    }

    @Override
    public void run() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            String message = scanner.nextLine();
            sendMessage(message);
        }
    }
}
