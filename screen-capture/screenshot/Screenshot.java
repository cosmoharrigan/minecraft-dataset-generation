package screenshot;

import java.awt.AWTException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

// Takes a series of screenshots and saves them as PNG files with an incrementing integer as the filename
public class Screenshot {
    public static void main(String[] args) throws AWTException, IOException, InterruptedException {  
        int i = 0;
        
        Rectangle screenRect = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
        Robot robot = new Robot();
        
        while(true) {
            BufferedImage capture = robot.createScreenCapture(screenRect);
            ImageIO.write(capture, "png", new File(Integer.toString(i) + ".png"));
            i++;
            System.out.println(i);
        }
    }
}
