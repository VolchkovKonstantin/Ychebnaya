import java.util.*;
import java.io.*;

/**
 * Created by Xaker on 10.02.2015.
 */
public class Juice {
    private ArrayList<Fruits> juice;
    private ArrayList<String> unique;
    private BufferedWriter uniqueFruts;
    private BufferedWriter sortComponent;
    private int minWash;
    private int numberWash;
    private int onesWash;

    public Juice() {
        minWash = Integer.MAX_VALUE;
        unique = new ArrayList<String>();
        numberWash = 0;
        juice = new ArrayList<Fruits>();
        onesWash = 0;
    }

    public void outUnique(String newJuice) throws IOException {
        boolean flag = unique.contains(newJuice);
        if (flag == false) {
            unique.add(newJuice);
            uniqueFruts.write(newJuice);
            uniqueFruts.newLine();
        }
    }

    public void wash(Fruits firstJuice, Fruits secondJuice) {
        int sizeFirst = firstJuice.getSize();
        int sizeSecond = secondJuice.getSize();
        if (sizeSecond < sizeFirst) {
            numberWash++;
            return;
        }
        int count = 0;
        for (int i = 0; i < sizeFirst; i++) {
            for (int j = i; j < sizeSecond; j++) {
                if (firstJuice.getName(i).equals(secondJuice.getName(j))) {
                    count++;
                    break;
                }
            }
        }
        if (count != firstJuice.getSize()) {
            numberWash++;
            return;
        }
        return;
    }

    public void permut(int forRecursion) {
        for (int i = forRecursion; i < juice.size(); i++) {
            Collections.swap(juice, i, forRecursion);
            permut(forRecursion + 1);
            Collections.swap(juice, forRecursion, i);
        }
        if (forRecursion == juice.size() - 1) {
            for (int i = 0; i < juice.size() - 1; i++) {
                wash(juice.get(i), juice.get(i + 1));
            }
            if (minWash > numberWash) {
                minWash = numberWash;
            }
            numberWash = 0;
        }
    }

    public void ones() {
        for (int i = 0; i < juice.size(); i++) {
            if (juice.get(i).getSize() == 1) {
                boolean flag = false;
                for (int j = 0; j < juice.size(); j++) {
                    for (int k = 0; k < juice.get(j).getSize(); k++) {
                        if (juice.get(j).getName(k).equals(juice.get(i).getName(0)) && j != i) {
                            flag = true;
                            break;
                        }
                        if (flag == true) {
                            break;
                        }
                    }
                }
                juice.remove(i);
                i--;
                if (flag == false)
                    onesWash++;
            }
        }
    }

    public void input() throws IOException {
        BufferedReader br = new BufferedReader(new FileReader("input.txt"));
        uniqueFruts = new BufferedWriter(new FileWriter("juice1.out"));
        sortComponent = new BufferedWriter(new FileWriter("juice2.out"));
        String inJuice;
        while ((inJuice = br.readLine()) != null) {
            Fruits fruit = new Fruits();
            String[] juiceStr;
            juiceStr = inJuice.split(" +");
            for (int i = 0; i < juiceStr.length; i++) {
                fruit.push(juiceStr[i]);
                outUnique(juiceStr[i]);
            }
            fruit.sort();
            juice.add(fruit);
            for (int i = 0; i < fruit.getSize(); i++) {
                sortComponent.write(fruit.getName(i) + "  ");
            }
            sortComponent.newLine();
        }
        br.close();
    }

    public void body() {
        ones();
        permut(0);
    }

    public void output() throws IOException {
        PrintWriter countwash = new PrintWriter(new FileWriter("juice3.out"));
        uniqueFruts.close();
        sortComponent.close();
        countwash.print(minWash + 1 + onesWash);
        countwash.close();
    }
}