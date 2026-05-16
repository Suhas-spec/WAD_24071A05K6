<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet Balance</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .container {
            width: min(420px, 92vw);
            background: #ffffff;
            border: 1px solid #d8e0ea;
            border-radius: 8px;
            padding: 28px;
            box-shadow: 0 12px 30px rgba(25, 38, 63, 0.12);
        }

        h1 {
            margin: 0 0 18px;
            color: #19263f;
            font-size: 28px;
        }

        .balance {
            margin: 0 0 22px;
            padding: 16px;
            background: #eaf4ff;
            border: 1px solid #b8d8f2;
            border-radius: 6px;
            color: #0f4f83;
            font-size: 22px;
            font-weight: 700;
        }

        label {
            display: block;
            margin: 14px 0 6px;
            color: #344054;
            font-weight: 700;
        }

        input,
        select {
            width: 100%;
            box-sizing: border-box;
            padding: 11px 12px;
            border: 1px solid #bac6d4;
            border-radius: 6px;
            font-size: 16px;
        }

        button {
            width: 100%;
            margin-top: 20px;
            padding: 12px 16px;
            border: 0;
            border-radius: 6px;
            background: #1565c0;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
        }

        button:hover {
            background: #0d4f9b;
        }

        .message {
            margin-top: 18px;
            padding: 12px;
            border-radius: 6px;
            background: #fff8e1;
            border: 1px solid #f0d675;
            color: #614a00;
        }

        footer {
            margin-top: 22px;
            color: #667085;
            font-size: 14px;
            text-align: center;
        }
    </style>
</head>
<body>
    <main class="container">
        <h1>Digital Wallet</h1>
        <p class="balance">Updated Balance: Rs. ${balance}</p>

        <form action="${pageContext.request.contextPath}/wallet" method="post">
            <label for="type">Transaction Type</label>
            <select id="type" name="type" required>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
            </select>

            <label for="amount">Amount</label>
            <input id="amount" name="amount" type="number" min="1" step="0.01" required>

            <button type="submit">Update Wallet Balance</button>
        </form>

        <% if (request.getAttribute("message") != null) { %>
            <p class="message"><%= request.getAttribute("message") %></p>
        <% } %>

        <footer>@24071a05k6</footer>
    </main>
</body>
</html>
