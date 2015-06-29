package screenshot;

import java.awt.AWTException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

// Takes a series of screenshots and saves them as PNG files 
// with the timestamp in milliseconds as the filename
public class Screenshot {
    public static void main(String[] args) throws AWTException, IOException, InterruptedException {  
        final Rectangle screenRect = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
        final Robot robot = new Robot();
        
        Runnable task = new Runnable() {
            public void run() {
                BufferedImage capture = robot.createScreenCapture(screenRect);
                long timestamp = System.currentTimeMillis();
                try {
                    ImageIO.write(capture, "png", new File(timestamp + ".png"));
                } catch (IOException e){
                    System.out.println("Exception: " + e);
                }
                System.out.println(timestamp);
            }
        };

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(task, 0, 1, TimeUnit.SECONDS);
    }
}
