import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.List;
import java.util.TreeMap;

public class MessageExchange {
    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(List<Message> messages) {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < messages.size(); i++) {
            JSONObject jsonObject1 = new JSONObject();
            jsonObject1.put("id", messages.get(i).getID());
            jsonObject1.put("username", messages.get(i).getUsername());
            jsonObject1.put("userMessage", messages.get(i).getMessage());
            jsonArray.add(jsonObject1);
        }
        jsonObject.put("messages", jsonArray);
        jsonObject.put("token", getToken(messages.size()));
        return jsonObject.toJSONString();
    }

    public String getClientSendMessageRequest(int id, String username, String message) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", id);
        jsonObject.put("username", username);
        jsonObject.put("message", message);
        return jsonObject.toJSONString();
    }

    public JSONObject getClientMessage(InputStream inputStream) throws ParseException {
        JSONObject jsonObject = getJSONObject(inputStreamToString(inputStream));
        return jsonObject;
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public String inputStreamToString(InputStream in) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length = 0;
        try {
            while ((length = in.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new String(baos.toByteArray());
    }
}
