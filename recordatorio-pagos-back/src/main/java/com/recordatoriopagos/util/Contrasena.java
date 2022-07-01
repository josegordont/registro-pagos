package com.recordatoriopagos.util;

import java.util.Random;

public class Contrasena {

	public static String alphaNumericString() {
		String letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		String mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String minusculas = "abcdefghijklmnopqrstuvwxyz";
		String caracteres = "-_*.";
		String numeros = "0123456789";
		Random rnd = new Random();
		StringBuilder sb = new StringBuilder(10);
		for (int i = 0; i < 6; i++) {
			sb.append(letras.charAt(rnd.nextInt(letras.length())));
		}
		sb.append(caracteres.charAt(rnd.nextInt(caracteres.length())));
		sb.append(numeros.charAt(rnd.nextInt(numeros.length())));
		sb.append(mayusculas.charAt(rnd.nextInt(mayusculas.length())));
		sb.append(minusculas.charAt(rnd.nextInt(minusculas.length())));
		return sb.toString();
	}

}
