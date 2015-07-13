"""
Basic example of how to use Spock

See the example plugin that is loaded in example_plugin.py
"""

__author__ = 'Cosmo Harrigan'

from spock import Client
from spock.plugins import DefaultPlugins

# Import the plugins you have created
from plugin import BotPlugin

# Enter your credentials and the server information
settings = {
    'start': {
        'username': '',
        'password': '',
    },
}

# Load the plugins. Any functionality that you want to implement must be called from a plugin.
# You can define new plugins that listen for arbitrary events from the game.
# Furthermore, events can even be periodic timers that trigger a method.
plugins = DefaultPlugins
plugins.append(('bot', BotPlugin))

# Instantiate and start the client, which will then run and wait for events to occur
client = Client(plugins=plugins, settings=settings)
client.start('localhost', 25565)
# client.start('blockworlds.micropsi-industries.com', 25565)
