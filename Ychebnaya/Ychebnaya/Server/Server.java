import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.util.*;
import java.util.concurrent.SynchronousQueue;

public class Server implements HttpHandler {
    private Map<Integer, Message> history = new TreeMap<Integer, Message>();
    private MessageExchange messageExchange = new MessageExchange();


    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: java Server port");
        } else {
            try {
                System.out.println("Server is starting...");
                Integer port = Integer.parseInt(args[0]);//999;
                HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
                System.out.println("Server started.");
                String serverHost = InetAddress.getLocalHost().getHostAddress();
                System.out.println("Get list of messages: GET http://" + serverHost + ":" + port + "/chat?token={token}");
                System.out.println("Send message: POST http://" + serverHost + ":" + port + "/chat provide body json in format {\"id\" : \"{id}\", \"username\" : \"{User 2}\", \"message\" : \"{message}\"} ");
                System.out.println("Send message: DELETE http://" + serverHost + ":" + port + "/chat provide body json in format {\"id\" : \"{id}\", \"username\" : \"{User 2}\", \"message\" : \"{message}\"} ");
                System.out.println("Send message: PUT http://" + serverHost + ":" + port + "/chat provide body json in format {\"id\" : \"{id}\", \"username\" : \"{User 2}\", \"message\" : \"{message}\"} ");

                server.createContext("/chat", new Server());
                server.setExecutor(null);
                server.start();
            } catch (IOException e) {
                System.out.println("Error creating http server: " + e);
            }
        }
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        String response = "";

        if ("GET".equals(httpExchange.getRequestMethod())) {
            response = doGet(httpExchange);
        } else if ("POST".equals(httpExchange.getRequestMethod())) {
            doPost(httpExchange);
        } else if ("DELETE".equals(httpExchange.getRequestMethod())) {
            doDelete(httpExchange);
        } else if ("PUT".equals(httpExchange.getRequestMethod())) {
            doPut(httpExchange);
        } else {
            response = "Unsupported http method: " + httpExchange.getRequestMethod();
        }

        sendResponse(httpExchange, response);
    }

    private ArrayList<Message> giveArrayMessages(int index) {
        ArrayList<Message> messages = new ArrayList<Message>();
        for (int i = index; i < history.size(); i++) {
            Message mes = history.get(i);
            if (mes != null) {
                messages.add(mes);
            }
        }
        return messages;
    }

    private String doGet(HttpExchange httpExchange) {
        String query = httpExchange.getRequestURI().getQuery();
        if (query != null) {
            Map<String, String> map = queryToMap(query);
            String token = map.get("token");
            if (token != null && !"".equals(token)) {
                int index = messageExchange.getIndex(token);
                return messageExchange.getServerResponse(giveArrayMessages(index));//username,history.subList(index, history.size()));
            } else {
                return "Token query parameter is absent in url: " + query;
            }
        }
        return "Absent query in url";
    }

    private void doPost(HttpExchange httpExchange) {
        try {
            JSONObject jsonObject = messageExchange.getClientMessage(httpExchange.getRequestBody());
            int id = Integer.parseInt(jsonObject.get("id").toString());
            String username = jsonObject.get("username").toString();
            String message = jsonObject.get("message").toString();
            System.out.println(id + ") " + username + " : " + message);
            history.put(id, new Message(id, username, message));
        } catch (ParseException e) {
            System.err.println("Invalid user message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void doDelete(HttpExchange httpExchange) {
        try {
            JSONObject jsonObject = messageExchange.getClientMessage(httpExchange.getRequestBody());
            int id = Integer.parseInt(jsonObject.get("id").toString());
            String username = jsonObject.get("username").toString();
            Message messages = history.get(id);
            if ((messages != null) && (username.equals(messages.getUsername())) && (messages.getFlag())) {
                System.out.println("Message are deleted " + username + " : " + messages.getMessage());
                messages.setMessage("");
                messages.setFlag(false);
            }
        } catch (ParseException e) {
            System.err.println("Invalid user message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void doPut(HttpExchange httpExchange) {
        try {
            JSONObject jsonObject = messageExchange.getClientMessage(httpExchange.getRequestBody());
            int id = Integer.parseInt(jsonObject.get("id").toString());
            String username = jsonObject.get("username").toString();
            String message = jsonObject.get("message").toString();
            Message messages = history.get(id);
            if ((messages != null) && (username.equals(messages.getUsername())) && (messages.getFlag())) {
                System.out.println("Put Message from user " + username + " : " + message);
                messages.setMessage(message);
            }
        } catch (ParseException e) {
            System.err.println("Invalid user message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void sendResponse(HttpExchange httpExchange, String response) {
        try {
            byte[] bytes = response.getBytes();
            Headers headers = httpExchange.getResponseHeaders();
            headers.add("Access-Control-Allow-Origin", "*");
            httpExchange.sendResponseHeaders(200, bytes.length);
            OutputStream os = httpExchange.getResponseBody();
            os.write(bytes);
            os.flush();
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Map<String, String> queryToMap(String query) {
        Map<String, String> result = new HashMap<String, String>();
        for (String param : query.split("&")) {
            String pair[] = param.split("=");
            if (pair.length > 1) {
                result.put(pair[0], pair[1]);
            } else {
                result.put(pair[0], "");
            }
        }
        return result;
    }
}
