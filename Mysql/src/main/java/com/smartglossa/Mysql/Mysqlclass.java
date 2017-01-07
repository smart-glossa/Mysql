package com.smartglossa.Mysql;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
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
			JSONObject result = new JSONObject();
			String uname = request.getParameter("uname");
			String pass = request.getParameter("pass");
			String dab = request.getParameter("dab");
			String tableName = request.getParameter("tableName");
			try {
				Class.forName("com.mysql.jdbc.Driver");
				Connection connection = DriverManager.getConnection("jdbc:mysql://" + mysqlServer + "/" + dab + "",
						uname, pass);
				Statement statement = connection.createStatement();
				String query = "select * from " + tableName;
				ResultSet rs = statement.executeQuery(query);
				ResultSetMetaData metaData = rs.getMetaData();
				int coulmnCount = metaData.getColumnCount();
				JSONArray columnNames = new JSONArray();
				for (int i =0 ; i< coulmnCount; i++) {
					columnNames.put(metaData.getColumnName(i));
				}
				result.put("columnName", columnNames);
				int key = 0;
				while (rs.next()) {
					JSONArray row = new JSONArray();
					for (int i=0; i < coulmnCount; i++) {
						row.put(rs.getString(columnNames.getString(i)));
					}
					result.put("" + key, row);
					key++;
				}
				response.getWriter().print(result);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

}