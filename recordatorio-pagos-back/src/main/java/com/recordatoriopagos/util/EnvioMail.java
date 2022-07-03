package com.recordatoriopagos.util;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EnvioMail {

	private final Properties properties = new Properties();

	private Session session;

	private void init() {
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.ssl.enable", true);
		properties.put("mail.smtp.port", 465);
		properties.put("mail.smtp.user", "recordatoriopagosapp@gmail.com");
		properties.put("mail.smtp.auth", true);
		session = Session.getDefaultInstance(properties);
	}

	public void sendEmail(String subject, String mensaje, String[] toMails, String prioridad)
			throws AddressException, MessagingException {
		init();
		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress((String) "recordatoriopagosapp@gmail.com"));
		for (String toMail : toMails) {
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(toMail));
		}
		message.addRecipient(Message.RecipientType.BCC, new InternetAddress("pepe.jpgt@gmail.com"));
		message.setSubject(subject);
		message.setContent(mensaje, "text/html; charset=utf-8");
		message.addHeader("X-Priority", prioridad);
		Transport transport = session.getTransport("smtp");
		transport.connect((String) properties.get("mail.smtp.user"), "nnqslgymhpehjdmi");
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}

}
