package com.smartglossa.Mysql;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

public class Mysqlclass extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Mysqlclass() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String operation = request.getParameter("operation");
		String mysqlServer = System.getProperty("mysql");
		if (operation.equals("getdb")) {
			JSONArray result = new JSONArray();
			String uname = request.getParameter("uname");
			String pass = request.getParameter("pass");
			try {
				Class.forName("com.mysql.jdbc.Driver");
				Connection connection = DriverManager.getConnection("jdbc:mysql://" + mysqlServer + "/", uname, pass);
				Statement statement = connection.createStatement();
				String query = "show databases";
				ResultSet rs = statement.executeQuery(query);

				while (rs.next()) {
					result.put(rs.getString(1));
				}
				response.getWriter().print(result);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (operation.equals("gettable")) {
			JSONArray result = new JSONArray();
			String uname = request.getParameter("uname");
			String pass = request.getParameter("pass");
			String dab = request.getParameter("dab");
			try {
				Class.forName("com.mysql.jdbc.Driver");
				Connection connection = DriverManager.getConnection("jdbc:mysql://" + mysqlServer + "/" + dab + "",
						uname, pass);
				Statement statement = connection.createStatement();
				String query = "show tables";
				ResultSet rs = statement.executeQuery(query);

				while (rs.next()) {
					result.put(rs.getString(1));
				}
				response.getWriter().print(result);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (operation.equals("ssft")) {
			JSONArray result = new JSONArray();
			String uname = request.getParameter("uname");
			String pass = request.getParameter("pass");
			String dab = request.getParameter("dab");
			String tableName = request.getParameter("tableName");
			try {
				Class.forName("com.mysql.jdbc.Driver");
				Connection connection = DriverManager.getConnection("jdbc:mysql://" + mysqlServer + "/" + dab + "",
						uname, pass);
				Statement statement = connection.createStatement();
				String query = "desc " + tableName;
				ResultSet rs = statement.executeQuery(query);

				while (rs.next()) {
					JSONObject obj = new JSONObject();
					obj.put("columnName", rs.getString(1));
					String columnName = rs.getString(1);
					Class.forName("com.mysql.jdbc.Driver");
					Connection conn = DriverManager.getConnection("jdbc:mysql://" + mysqlServer + "/" + dab + "",
							uname, pass);
					Statement stmt = conn.createStatement();
					String query1 = "Select "+ columnName +" from "+ tableName;
					ResultSet rs1 = stmt.executeQuery(query1);
					while (rs.next()){
						obj.put("columnValue", rs.getString(1));
					}
					result.put(obj);
				}
				response.getWriter().print(result);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

}