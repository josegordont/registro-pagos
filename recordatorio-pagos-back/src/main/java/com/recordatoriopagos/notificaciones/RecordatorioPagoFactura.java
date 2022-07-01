package com.recordatoriopagos.notificaciones;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.recordatoriopagos.dto.NotificacionFacturaDto2;
import com.recordatoriopagos.models.Parametro;
import com.recordatoriopagos.repositories.FacturaRepository;
import com.recordatoriopagos.repositories.ParametroRepository;
import com.recordatoriopagos.util.EnvioMail;

@Component
@EnableScheduling
public class RecordatorioPagoFactura {

	private static final Logger logger = LogManager.getLogger(RecordatorioPagoFactura.class);

	private static final String TIME_ZONE = "America/Guayaquil";

	@Autowired
	ParametroRepository parametroRepository;

	@Autowired
	FacturaRepository facturaRepository;

//	@Scheduled(cron = "0 30 8 * * *", zone = TIME_ZONE)
	@Scheduled(cron = "0 17 22 * * *", zone = TIME_ZONE)
	public void notificacion1() {
		try {
			envioNotificacion("dias_notificacion1");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Scheduled(cron = "0 40 8 * * *", zone = TIME_ZONE)
	public void notificacion2() {
		try {
			envioNotificacion("dias_notificacion2");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	public void envioNotificacion(String claveNotificacion) throws AddressException, MessagingException {
		String subject = "Recordatorio pagos facturas {{numeroDias}}";
		logger.info("***** Iniciando recordatorio facturas *****");
		Parametro diasNotificacion = parametroRepository.findByClave("dias_notificacion1");
		List<NotificacionFacturaDto2> facturasNotificar = facturaRepository
				.obtenerFacturasNotificacion(claveNotificacion);
		// notificación
		StringBuilder bodyNotificacion = new StringBuilder();
		bodyNotificacion.append("<p>Estimados, buenos días,<br><br>");
		bodyNotificacion.append("Por favor tener en cuenta que las proximas facturas estan por finalizar en "
				.concat(diasNotificacion.getValor()).concat(" días o menos:<br><br>"));
		bodyNotificacion.append("<table><thead>");
		bodyNotificacion.append("<tr>");
		bodyNotificacion.append("<th>Cliente</th>");
		bodyNotificacion.append("<th>Proyecto</th>");
		bodyNotificacion.append("<th>Número Factura</th>");
		bodyNotificacion.append("<th>Monto</th>");
		bodyNotificacion.append("<th>Fecha Fin</th>");
		bodyNotificacion.append("<th>Días para Finalizar</th>");
		bodyNotificacion.append("</tr>");
		bodyNotificacion.append("</thead><tbody>");
		for (NotificacionFacturaDto2 factura : facturasNotificar) {
			bodyNotificacion.append("<tr>");
			bodyNotificacion.append("<td>".concat(factura.getNombreCliente()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getNombreProyecto()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getNumeroFactura()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getMonto().toString()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getFechaFin().toString()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getDiasFechaFin().toString()).concat("</td>"));
			bodyNotificacion.append("</tr>");
		}
		bodyNotificacion.append("</tbody></table><br>");
		bodyNotificacion.append("Saludos,<br><br>");
		bodyNotificacion.append("Recordatorio Pagos.</p>");
		// Envío mail
		EnvioMail envioMail = new EnvioMail();
		Parametro toNotificacion = parametroRepository.findByClave("correos_notificacion");
		String[] toMails = toNotificacion.getValor().split(";");
		envioMail.sendEmail(subject.replace("{{numeroDias}}", diasNotificacion.getValor()), bodyNotificacion.toString(),
				toMails);
		// Actualiza facturas
		for (NotificacionFacturaDto2 factura : facturasNotificar) {
			facturaRepository.actualizarNumNotificaciones(factura.getIdFactura());
		}
	}

}
