package com.wallet;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.*;

@WebServlet("/wallet")
public class WalletServlet extends HttpServlet {

    // Simulated wallet balance (in-memory)
    private double balance = 5000.00;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("balance", balance);
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
            double amount = Double.parseDouble(amountStr);
            if (amount <= 0) {
                message = "ERROR: Amount must be greater than zero.";
            } else if (type.equals("credit")) {
                balance += amount;
                message = "SUCCESS: ₹" + String.format("%.2f", amount) + " credited to your wallet.";
            } else if (type.equals("debit")) {
                if (amount > balance) {
                    message = "ERROR: Insufficient balance.";
                } else {
                    balance -= amount;
                    message = "SUCCESS: ₹" + String.format("%.2f", amount) + " debited from your wallet.";
                }
            } else {
                message = "ERROR: Invalid transaction type.";
            }
        } catch (NumberFormatException e) {
            message = "ERROR: Please enter a valid amount.";
        }

        request.setAttribute("balance", balance);
        request.setAttribute("message", message);
        request.getRequestDispatcher("/WEB-INF/wallet.jsp").forward(request, response);
    }
}
