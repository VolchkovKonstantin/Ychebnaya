/**
 * Created by Xaker on 29.03.2015.
 */
public class Message {
    private int id;
    private String username;
    private String message;
    private boolean flag;

    public Message(int id, String username, String message) {
        this.id = id;
        this.username = username;
        this.message = message;
        this.flag = true;
    }

    public int getID() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
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

    public void setUsername(String username) {
        this.username = username;
        return;
    }

    public void setMessage(String message) {
        this.message = message;
        return;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}
