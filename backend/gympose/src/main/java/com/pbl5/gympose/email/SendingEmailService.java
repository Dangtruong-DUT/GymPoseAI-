package com.pbl5.gympose.email;

import com.pbl5.gympose.config.AppProperties;
import com.pbl5.gympose.utils.LogUtils;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SendingEmailService {
    JavaMailSender emailSender;
    MessageSource messageSource;
    SpringTemplateEngine springTemplateEngine;
    AppProperties appProperties;

    @Async("emailTaskExecutor")
    public void sendEmailFromTemplate(
            String email,
            String templateName,
            String referUrl,
            String titleKey,
            String additionText,
            String language) {
        Context context = new Context();
        Locale locale = new Locale(language);

        context.setLocale(locale);
        if (Objects.nonNull(referUrl)) {
            context.setVariable("url", referUrl);
        }
        context.setVariable("additionText", additionText);
        String subject = messageSource.getMessage(titleKey, null, "Default Subject", locale);
        String detail = springTemplateEngine.process(templateName, context);

        this.sendMail(email, subject, detail);
    }

    @Async("emailTaskExecutor")
    public void sendEmailFromTemplate(
            String email,
            String templateName,
            String referUrl,
            String titleKey,
            String additionText,
            String language,
            String reason) {
        Context context = new Context();
        Locale locale = new Locale(language);

        context.setLocale(locale);
        if (Objects.nonNull(referUrl)) {
            context.setVariable("url", referUrl);
        }
        context.setVariable("additionText", additionText);
        context.setVariable("email", email);
        context.setVariable("reason", reason);
        String subject = messageSource.getMessage(titleKey, null, locale);
        String detail = springTemplateEngine.process(templateName, context);
        this.sendMail(email, subject, detail);
    }

    @Async("emailTaskExecutor")
    public void sendEmailFromTemplate(
            String email,
            String templateName,
            String referUrl,
            String titleKey,
            String additionText,
            String reason,
            String language,
            List<String> fileNames) {

        Context context = new Context();
        Locale locale = new Locale(language);

        context.setLocale(locale);
        if (Objects.nonNull(referUrl)) {
            context.setVariable("url", referUrl);
        }
        //    context.setVariable("user", receiver);
        context.setVariable("additionText", additionText);
        if (!reason.isEmpty()) {
            context.setVariable("reason", reason);
        }
        String subject = messageSource.getMessage(titleKey, null, locale);
        String detail = springTemplateEngine.process(templateName, context);
        this.sendMail(email, subject, detail);
    }

    @Async("emailTaskExecutor")
    public void sendDeleteAccount(String email, String code, String language) {
        Context context = new Context();
        Locale locale = new Locale(language);

        context.setLocale(locale);

        context.setVariable("code", code);
        String subject = messageSource.getMessage("email.delete.user.subject", null, locale);
        String detail = springTemplateEngine.process("mail/deleteUserMail", context);
        this.sendMail(email, subject, detail);
    }

    private void sendMail(String email, String subject, String detail) {
        try {
            MimeMessage message = emailSender.createMimeMessage();

            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "utf-8");
            messageHelper.setFrom(appProperties.getAdmin().getEmail());
            messageHelper.setTo(email);
            messageHelper.setSubject(subject);
            messageHelper.setText(detail, true);
            emailSender.send(message);
        } catch (Exception e) {
            LogUtils.error(e.getMessage());
        }
    }
}
