package com.common.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StateHolder {
    private static final StateHolder stateHolder = new StateHolder();
    private static final Map<String, Map<String, Object>> stateHolderMap = new HashMap();

    private StateHolder() {
    }

    public static StateHolder getInstance() {
        return stateHolder;
    }

    public <T> void put(String key, T value) {
        Map<String, Object> threadMap = this.getMapForCurrentThread();
        threadMap.put(key, value);
    }

    public <T> void addToList(String key, T value) {
        List<T> list = this.getList(key);
        if (list == null) {
            list = new ArrayList();
        }

        ((List)list).add(value);
        this.put(key, list);
    }

    private Map<String, Object> getMapForCurrentThread() {
        Map<String, Object> threadMap = stateHolderMap.get(Thread.currentThread().getName());
        if (threadMap == null) {
            synchronized(stateHolderMap) {
                threadMap = new HashMap();
                stateHolderMap.put(Thread.currentThread().getName(), threadMap);
            }
        }

        return threadMap;
    }

    public Object get(String key) {
        Map<String, Object> threadMap = this.getMapForCurrentThread();
        return threadMap.get(key);
    }

    public void remove(String key) {
        Map<String, Object> threadMap = this.getMapForCurrentThread();
        threadMap.remove(key);
    }

    public <T> List<T> getList(String key) {
        return (List)this.get(key);
    }

    public void clear() {
        Map<String, Object> threadMap = this.getMapForCurrentThread();
        if (threadMap != null) {
            threadMap.clear();
        }

    }

    public boolean hasKey(String keyName) {
        Map<String, Object> threadMap = this.getMapForCurrentThread();
        return threadMap.containsKey(keyName);
    }
}