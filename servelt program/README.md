# Wallet Servlet Program

This servlet program displays the updated wallet balance after a credit or debit transaction.

## Files

- `src/main/java/com/wallet/WalletServlet.java` handles wallet balance updates.
- `src/main/webapp/WEB-INF/wallet.jsp` displays the form, transaction message, and updated balance.
- `src/main/webapp/index.jsp` redirects to the wallet page.

## Run

Build the WAR file with Maven:

```sh
mvn clean package
```

Deploy the generated WAR file from `target/` to a Jakarta Servlet container such as Tomcat 10 or newer.
