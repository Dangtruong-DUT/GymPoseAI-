package com.pbl5.gympose.consumer;

import com.pbl5.gympose.payload.message.AIResultMessage;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AIResultConsumer {
    RabbitTemplate rabbitTemplate;

    @RabbitListener(queues = RabbitMQConstant.AI_RESULT_QUEUE)
    public void handleResult(AIResultMessage message) {
        try {
            rabbitTemplate.convertAndSend(RabbitMQConstant.AI_RESULT_FANOUT_EXCHANGE, "", message);
        } catch (Exception e) {
            LogUtils.error("ERROR - AI Result consumer " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                LogUtils.error("ERROR - Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
        }
    }
}