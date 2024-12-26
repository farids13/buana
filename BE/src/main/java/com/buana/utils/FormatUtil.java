package com.buana.utils;

import java.util.regex.Pattern;

public class FormatUtil {

    public static boolean isUUIDFormat(String str, boolean skipNullValue) {
		Pattern pattern = Pattern.compile("^[{]?[\\da-fA-F]{8}-([\\da-fA-F]{4}-){3}[\\da-fA-F]{12}}?$");
		if (str == null) return skipNullValue;
		return pattern.matcher(str).matches();
	}

    public static boolean isEmailFormat(String str) {
		String regex = "^[\\w-.]+@[\\w-.]+[\\w-]{2,4}$";

		Pattern pattern = Pattern.compile(regex);
		return pattern.matcher(str).matches();
	}

}
