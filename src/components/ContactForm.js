import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);

    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message
    };

    emailjs.send('service_10y6ww9', 'template_st0qsqa', templateParams, 'KEah7QPKpKW7BsYuM')
      .then((response) => {
        console.log('Сообщение отправлено успешно!', response.status, response.text);
      }, (error) => {
        console.error('Ошибка при отправке сообщения.', error);
      });

    setSubmitted(true);
    reset();
  };

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} transition={{ duration: 0.5 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Ваше ФИО</Form.Label>
          <motion.div initial="hidden" animate="visible" variants={variants} transition={{ duration: 0.5, delay: 0.1 }}>
            <Form.Control type="text" placeholder="Введите ваше имя" {...register('name', { required: true })} />
            {errors.name && <span className="text-danger">Заполните данное поле</span>}
          </motion.div>
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Ваш Email адрес</Form.Label>
          <motion.div initial="hidden" animate="visible" variants={variants} transition={{ duration: 0.5, delay: 0.2 }}>
            <Form.Control type="email" placeholder="Введите ваш email" {...register('email', { required: true })} />
            {errors.email && <span className="text-danger">Заполните данное поле</span>}
          </motion.div>
        </Form.Group>
        <Form.Group controlId="message" className="mt-3">
          <Form.Label>Сообщение</Form.Label>
          <motion.div initial="hidden" animate="visible" variants={variants} transition={{ duration: 0.5, delay: 0.3 }}>
            <Form.Control as="textarea" rows={3} {...register('message', { required: true })} />
            {errors.message && <span className="text-danger">Заполните данное поле</span>}
          </motion.div>
        </Form.Group>
        <motion.div initial="hidden" animate="visible" variants={variants} transition={{ duration: 0.5, delay: 0.4 }}>
          <Button className="mt-3" variant="primary" type="submit">Отправить</Button>
        </motion.div>
      </Form>

      <AnimatePresence>
        {submitted && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={variants} transition={{ duration: 0.5 }}>
            <Alert variant="success" className="mt-3">Заявка успешно отправлена!</Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ContactForm;
