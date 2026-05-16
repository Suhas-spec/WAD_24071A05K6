package com.wallet;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.*;

@WebServlet("/wallet")
public class WalletServlet extends HttpServlet {

    // Simulated wallet balance for this servlet program.
    private double balance = 5000.00;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("balance", getBalance());
        request.setAttribute("message", null);
        request.getRequestDispatcher("/WEB-INF/wallet.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String type = request.getParameter("type");
        String amountStr = request.getParameter("amount");
        String message;

        try {
            if (amountStr == null || amountStr.trim().isEmpty()) {
                throw new NumberFormatException("Missing amount");
            }

            double amount = Double.parseDouble(amountStr);
            if (amount <= 0) {
                message = "ERROR: Amount must be greater than zero.";
            } else if ("credit".equals(type)) {
                synchronized (this) {
                    balance += amount;
                }
                message = "SUCCESS: Rs. " + String.format("%.2f", amount) + " credited to your wallet.";
            } else if ("debit".equals(type)) {
                synchronized (this) {
                    if (amount > balance) {
                        message = "ERROR: Insufficient balance.";
                    } else {
                        balance -= amount;
                        message = "SUCCESS: Rs. " + String.format("%.2f", amount) + " debited from your wallet.";
                    }
                }
            } else {
                message = "ERROR: Invalid transaction type.";
            }
        } catch (NumberFormatException e) {
            message = "ERROR: Please enter a valid amount.";
        }

        request.setAttribute("balance", getBalance());
        request.setAttribute("message", message);
        request.getRequestDispatcher("/WEB-INF/wallet.jsp").forward(request, response);
    }

    private synchronized double getBalance() {
        return balance;
    }
}
