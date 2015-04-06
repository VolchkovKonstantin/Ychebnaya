/**
 * Created by Xaker on 29.03.2015.
 */
public class Message {
    private long id;
    private String user;
    private String message;
    private boolean flag;

    public Message(long id, String user, String message) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.flag = true;
    }

    public long getID() {
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

    public void setID(long id) {
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

    public Message getStructofMessage(long id, String user, String message) {
        Message structMessage = new Message(id, user, message);
        return structMessage;
    }
    public String toString() {
        return "{\"id\":\"" + this.id + "\",\"user\":\"" + this.user + "\",\"message\":" + this.message + "}";
    }
}
