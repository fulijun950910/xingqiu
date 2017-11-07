<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <% for (var i in htmlWebpackPlugin.options.cdn.css) { %><link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>"><% } %>
    <link rel="shortcut icon" type="image/ico" href="./src/assets/favicon.ico">
  </head>
  <body>
    <div id="app"></div>
    <% for (var i in htmlWebpackPlugin.options.cdn.js) { %><script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script><% } %>
  </body>
</html>
