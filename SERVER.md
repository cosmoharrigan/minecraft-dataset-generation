## Configuration
In order to enable the ```setblock``` command, edit the file in the bukkit folder named ```plugins/PermissionsEx/permissions.yml``` to add the line ```- essentials.setblock``` in the following section:

```
  Regulars:
    permissions:
    - essentials.setblock
```

## Running the Bukkit server
- Obtain the server dump
- Start the server:
    java -Dfile.encoding=utf-8 -Djline.terminal=jline.UnsupportedTerminal -client -Xmx1024M -jar spigot.jar nogui -d yyyy-MM-dd HH:mm:ss -nojline --log-strip-color
