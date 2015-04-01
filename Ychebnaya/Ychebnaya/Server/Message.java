/**
 * Created by Xaker on 29.03.2015.
 */
public class Message {
    private int id;
    private String user;
    private String message;
    private boolean flag;

    public Message(int id, String user, String message) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.flag = true;
    }

    public int getID() {
        return this.id;
    }

    public String getUser() {
        return this.user;
    }

    public String getMessage() {
        return this.message;
    }

    public boolean getFlag() {
        return this.flag;
    }

    public void setID(int id) {
        this.id = id;
        return;
    }

    public void setUser(String username) {
        this.user = username;
        return;
    }

    public void setMessage(String message) {
        this.message = message;
        return;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public Message getStructofMessage(int id, String user, String message) {
        Message structMessage = new Message(id, user, message);
        return structMessage;
    }
}
