package com.bean;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;
	private String username;
	private String password;
	private int isadmin;
	
	@OneToMany (mappedBy = "login")
	//private List<OrderInfo> listOfOrders;

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getIsadmin() {
		return isadmin;
	}

	public void setIsadmin(int isadmin) {
		this.isadmin = isadmin;
	}

	//public List<OrderInfo> getListOfOrders() {
		//return listOfOrders;
	//}

	//public void addOrder (OrderInfo orderInfo) {
		//this.listOfOrders.add(orderInfo);
		//orderInfo.setLogin(this);
	//}

	//@Override
	//public String toString() {
		//return "Login [uid=" + uid + ", username=" + username + ", password=" + password + ", isadmin=" + isadmin
			//	+ ", listOfOrders=" + listOfOrders + "]";
	//}

}