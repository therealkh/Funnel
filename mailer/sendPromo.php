<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$username = $_POST['name'];
$phonenumber = $_POST['phone'];
//$company = $_POST['company'];
//$msg = $_POST['msg'];

// Формирование самого письма
$title = "Клиент запросил бесплатную диагностику";
$body = "
<h2>Клиент успел запросить бесплатную диагностику на сайте Funnel</h2><br>
<br>Фамилия Имя:</br> $username<br>
<b>Телефон:</b> $phonenumber<br><br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'mailer.stanum.delta'; // Логин на почте
    $mail->Password   = 'stanum159357'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('mailer.stanum.delta@mail.ru', 'Funnel Notifications (Promo)'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('uktam4ik.khamidov@gmail.com');  
    //$mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
//if (!empty($file['name'][0])) {
//    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
//        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
//        $filename = $file['name'][$ct];
//        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
//            $mail->addAttachment($uploadfile, $filename);
//            $rfile[] = "Файл $filename прикреплён";
//        } else {
//            $rfile[] = "Не удалось прикрепить файл $filename";
//        }
//    }   
//}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);