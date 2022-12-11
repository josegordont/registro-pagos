package com.recordatoriopagos.notificaciones;

import java.math.BigDecimal;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.recordatoriopagos.dto.NotificacionFacturaDto;
import com.recordatoriopagos.dto.NotificacionGarantiaDto;
import com.recordatoriopagos.models.Parametro;
import com.recordatoriopagos.repositories.FacturaRepository;
import com.recordatoriopagos.repositories.GarantiaRepository;
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

	@Autowired
	GarantiaRepository garantiaRepository;

	@Scheduled(cron = "0 30 8 * * *", zone = TIME_ZONE)
	public void notificacionFactura1() {
		try {
			envioNotificacionFacturas("dias_notificacion1", 0, "3");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Scheduled(cron = "0 35 8 * * *", zone = TIME_ZONE)
	public void notificacionGarantia1() {
		try {
			envioNotificacionGarantias("dias_notificacion1", 0, "3");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Scheduled(cron = "0 40 8 * * *", zone = TIME_ZONE)
	public void notificacionFactura2() {
		try {
			envioNotificacionFacturas("dias_notificacion2", 1, "1");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Scheduled(cron = "0 45 8 * * *", zone = TIME_ZONE)
	public void notificacionGarantia2() {
		try {
			envioNotificacionGarantias("dias_notificacion2", 1, "1");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	public void envioNotificacionFacturas(String claveNotificacion, Integer numNotificacion, String prioridad)
			throws AddressException, MessagingException {
		String subject = "{{numeroDias}} días: Recordatorio Pago Facturas Mensuales";
		logger.info("***** Iniciando recordatorio facturas *****");
		Parametro diasNotificacion = parametroRepository.findByClave(claveNotificacion);
		List<NotificacionFacturaDto> facturasNotificar = facturaRepository
				.obtenerFacturasNotificacion(claveNotificacion, numNotificacion);
		if (facturasNotificar.size() == 0) {
			logger.info("***** Sin facturas a notificar *****");
			return;
		}
		// notificación
		StringBuilder bodyNotificacion = new StringBuilder();
		bodyNotificacion.append("<html><head>");
		bodyNotificacion.append("<style>");
		bodyNotificacion.append("table, th, td {border: #000 1px solid; border-collapse: collapse;}");
		bodyNotificacion.append("th, td {margin: 5px; padding: 5px;}");
		bodyNotificacion.append("th {text-align: center;}");
		bodyNotificacion.append(".right {text-align:right;}");
		bodyNotificacion.append("</style></head>");
		bodyNotificacion.append("<body><p>Estimados,<br><br>");
		bodyNotificacion.append("Por favor tener en cuenta que las proximas facturas estan por finalizar en "
				.concat(diasNotificacion.getValor()).concat(" días o menos:<br><br>"));
		bodyNotificacion.append("<table><thead>");
		bodyNotificacion.append("<tr>");
		bodyNotificacion.append("<th>Cliente</th>");
		bodyNotificacion.append("<th>Proyecto</th>");
		bodyNotificacion.append("<th>Número Factura</th>");
		bodyNotificacion.append("<th>Importe</th>");
		bodyNotificacion.append("<th>Retención</th>");
		bodyNotificacion.append("<th>Iva</th>");
		bodyNotificacion.append("<th>Total</th>");
		bodyNotificacion.append("<th>Fecha Fin</th>");
		bodyNotificacion.append("<th>Días para Finalizar</th>");
		bodyNotificacion.append("</tr>");
		bodyNotificacion.append("</thead><tbody>");
		BigDecimal totalMonto = new BigDecimal(0);
		BigDecimal totalRetencion = new BigDecimal(0);
		BigDecimal totalIva = new BigDecimal(0);
		BigDecimal totalTotal = new BigDecimal(0);
		for (NotificacionFacturaDto factura : facturasNotificar) {
			totalMonto = totalMonto.add(factura.getMonto());
			totalRetencion = totalRetencion.add(factura.getRetencion());
			totalIva = totalIva.add(factura.getIva());
			totalTotal = totalTotal.add(factura.getTotal());
			bodyNotificacion.append("<tr>");
			bodyNotificacion.append("<td>".concat(factura.getNombreCliente()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getNombreProyecto()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getNumeroFactura()).concat("</td>"));
			bodyNotificacion.append("<td class=\"right\">".concat(factura.getMonto().toString()).concat("</td>"));
			bodyNotificacion.append("<td class=\"right\">".concat(factura.getRetencion().toString()).concat("</td>"));
			bodyNotificacion.append("<td class=\"right\">".concat(factura.getIva().toString()).concat("</td>"));
			bodyNotificacion.append("<td class=\"right\">".concat(factura.getTotal().toString()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(factura.getFechaFin().toString()).concat("</td>"));
			bodyNotificacion
					.append("<td class=\"right\">".concat(factura.getDiasFechaFin().toString()).concat("</td>"));
			bodyNotificacion.append("</tr>");
		}
		bodyNotificacion.append("</tbody>");
		bodyNotificacion.append("<tfoot>");
		bodyNotificacion.append("<tr><td></td><td></td>");
		bodyNotificacion.append("<td class=\"right\"><b>Total:</b></td>");
		bodyNotificacion.append("<td class=\"right\"><b>".concat(totalMonto.toString()).concat("</b></td>"));
		bodyNotificacion.append("<td class=\"right\"><b>".concat(totalRetencion.toString()).concat("</b></td>"));
		bodyNotificacion.append("<td class=\"right\"><b>".concat(totalIva.toString()).concat("</b></td>"));
		bodyNotificacion.append("<td class=\"right\"><b>".concat(totalTotal.toString()).concat("</b></td>"));
		bodyNotificacion.append("<td></td><td></td></tr>");
		bodyNotificacion.append("</tfoot></table><br>");
		bodyNotificacion.append(
				"Para ingresar presione aquí: <a href=\"http://69.61.102.89/login\">Recordatorio Pagos</a><br><br>");
		bodyNotificacion.append("Saludos,<br><br>");
		bodyNotificacion.append("Recordatorio Pagos.</p>");
		bodyNotificacion.append("</body></html>");
		// Envío mail
		EnvioMail envioMail = new EnvioMail();
		Parametro toNotificacion = parametroRepository.findByClave("correos_notificacion");
		String[] toMails = toNotificacion.getValor().split(";");
		envioMail.sendEmail(subject.replace("{{numeroDias}}", diasNotificacion.getValor()), bodyNotificacion.toString(),
				toMails, prioridad);
		// Actualiza facturas
		for (NotificacionFacturaDto factura : facturasNotificar) {
			facturaRepository.actualizarNumNotificaciones(factura.getIdFactura());
		}
	}

	public void envioNotificacionGarantias(String claveNotificacion, Integer numNotificacion, String prioridad)
			throws AddressException, MessagingException {
		String subject = "{{numeroDias}} días: Recordatorio Pago Garantías";
		logger.info("***** Iniciando recordatorio garantias *****");
		Parametro diasNotificacion = parametroRepository.findByClave(claveNotificacion);
		List<NotificacionGarantiaDto> garantiasNotificar = garantiaRepository
				.obtenerGarantiasNotificacion(claveNotificacion, numNotificacion);
		if (garantiasNotificar.size() == 0) {
			logger.info("***** Sin garantias a notificar *****");
			return;
		}
		// notificación
		StringBuilder bodyNotificacion = new StringBuilder();
		bodyNotificacion.append("<html><head>");
		bodyNotificacion.append("<style>");
		bodyNotificacion.append("table, th, td {border: #000 1px solid; border-collapse: collapse;}");
		bodyNotificacion.append("th, td {margin: 5px; padding: 5px;}");
		bodyNotificacion.append("th {text-align: center;}");
		bodyNotificacion.append(".right {text-align:right;}");
		bodyNotificacion.append("</style></head>");
		bodyNotificacion.append("<body><p>Estimados,<br><br>");
		bodyNotificacion.append("Por favor tener en cuenta que las proximas garantias estan por finalizar en "
				.concat(diasNotificacion.getValor()).concat(" días o menos:<br><br>"));
		bodyNotificacion.append("<table><thead>");
		bodyNotificacion.append("<tr>");
		bodyNotificacion.append("<th>Cliente</th>");
		bodyNotificacion.append("<th>Proyecto</th>");
		bodyNotificacion.append("<th>Total</th>");
		bodyNotificacion.append("<th>Fecha Fin</th>");
		bodyNotificacion.append("<th>Días para Finalizar</th>");
		bodyNotificacion.append("</tr>");
		bodyNotificacion.append("</thead><tbody>");
		for (NotificacionGarantiaDto garantia : garantiasNotificar) {
			bodyNotificacion.append("<tr>");
			bodyNotificacion.append("<td>".concat(garantia.getNombreCliente()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(garantia.getNombreProyecto()).concat("</td>"));
			bodyNotificacion.append("<td class=\"right\">".concat(garantia.getTotal().toString()).concat("</td>"));
			bodyNotificacion.append("<td>".concat(garantia.getFechaDevolucion().toString()).concat("</td>"));
			bodyNotificacion
					.append("<td class=\"right\">".concat(garantia.getDiasFechaFin().toString()).concat("</td>"));
			bodyNotificacion.append("</tr>");
		}
		bodyNotificacion.append("</tbody>");
		bodyNotificacion.append("</table><br>");
		bodyNotificacion.append(
				"Para ingresar presione aquí: <a href=\"http://69.61.102.89/login\">Recordatorio Pagos</a><br><br>");
		bodyNotificacion.append("Saludos,<br><br>");
		bodyNotificacion.append("Recordatorio Pagos.</p>");
		bodyNotificacion.append("</body></html>");
		// Envío mail
		EnvioMail envioMail = new EnvioMail();
		Parametro toNotificacion = parametroRepository.findByClave("correos_notificacion");
		String[] toMails = toNotificacion.getValor().split(";");
		envioMail.sendEmail(subject.replace("{{numeroDias}}", diasNotificacion.getValor()), bodyNotificacion.toString(),
				toMails, prioridad);
		// Actualiza garantias
		for (NotificacionGarantiaDto garantia : garantiasNotificar) {
			garantiaRepository.actualizarNumNotificaciones(garantia.getIdGarantia());
		}
	}

}
