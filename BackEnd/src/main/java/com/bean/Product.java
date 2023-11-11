package com.bean;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	private String pname;
	private float price;
	private boolean isEnabled;
	@Lob
	private String productimage;
	
	@ManyToOne 
    private Category category;
	
	//@OneToMany (mappedBy = "product")
	//private List<OrderInfo> listOfOrders;

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getProductimage() {
		return productimage;
	}

	public void setProductimage(String productimage) {
		this.productimage = productimage;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
	
	public boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
	
/*
	public List<OrderInfo> getListOfOrders() {
		return listOfOrders;
	}
	
	public void addOrder (OrderInfo orderInfo) {
		this.listOfOrders.add(orderInfo);
		orderInfo.setProduct(this);
	}

	@Override
	public String toString() {
		return "Product [pid=" + pid + ", pname=" + pname + ", price=" + price + ", productimage=" + productimage
				+ ", category=" + category + ", listOfOrders=" + listOfOrders + "]";
	}
*/
	@Override
	public String toString() {
		return "Product [pid=" + pid + ", pname=" + pname + ", price=" + price + ", productimage=" + productimage
				+ ", category=" + category + "]";
	}
}