/**
 * Created by Xaker on 15.02.2015.
 */

import java.util.*;

/**
 * Created by Xaker on 10.02.2015.
 */
public class Fruits {
    private ArrayList<String> name;
    private int size;

    public Fruits(Juice f) {
        size = 0;
        name = new ArrayList<String>();
    }

    public Fruits() {
        name = new ArrayList<String>();
        size = 0;
    }

    public int getSize() {
        return size;
    }
    public void push(String fruit) {
        this.name.add(fruit);
        size++;
    }

    public String getName(int n) {
        return name.get(n);
    }

    public void sort() {
        Collections.sort(name, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o1.compareTo(o2);
            }
        });
    }
}
