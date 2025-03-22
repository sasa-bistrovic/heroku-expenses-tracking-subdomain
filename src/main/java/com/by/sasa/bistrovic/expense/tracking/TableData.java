package com.by.sasa.bistrovic.expense.tracking;
// TableData.java

import java.util.List;

public class TableData {
    private int id;
    private List<String> titles;
    private List<String> headers;
    private List<List<String>> rows;
    private List<String> total;

    // Constructors, Getters, and Setters
    public TableData(int id, List<String> titles, List<String> headers, List<List<String>> rows, List<String> total) {
        this.id = id;
        this.titles = titles;
        this.headers = headers;
        this.rows = rows;
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<String> getTitles() {
        return titles;
    }

    public void setTitles(List<String> titles) {
        this.titles = titles;
    }

    public List<String> getHeaders() {
        return headers;
    }

    public void setHeaders(List<String> headers) {
        this.headers = headers;
    }

    public List<List<String>> getRows() {
        return rows;
    }

    public void setRows(List<List<String>> rows) {
        this.rows = rows;
    }

    public List<String> getTotal() {
        return total;
    }

    public void setTotal(List<String> total) {
        this.total = total;
    }
}