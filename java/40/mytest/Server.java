/**
 *
 */

package mytest.server;

import mytest.client.Client;

public class Server {
  public static void main(String[] args) {
    Client myClient = new Client();
    myClient.echo();
  }
}
