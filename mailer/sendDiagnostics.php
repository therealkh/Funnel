<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$company = $_POST['company'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$company_type = $_POST['company_type'];
$insta_link = $_POST['insta_link'];
$fb_link = $_POST['fb_link'];
$site_link = $_POST['site_link'];
$rivals = $_POST['rivals'];

// Формирование самого письма
$title = "Заявка на диагностику от клиента.";
$body = "
<h2>Новая заявка от клиента на сайте Funnel</h2><br><br><br>
<br>Название компании:</br> $company<br>
<b>Телефон:</b> $phone<br>
<b>E-mail:</b> $email<br>
<b>Направление компании:</b> $company_type<br>
<b>Instagram:</b> $insta_link<br>
<b>Facebook:</b> $fb_link<br>
<b>Сайт компании:</b> $site_link<br>
<b>Конкуренты:</b> $rivals<br>
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
    $mail->setFrom('mailer.stanum.delta@mail.ru', 'Funnel Notifications'); // Адрес самой почты и имя отправителя

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