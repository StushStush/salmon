<?php

class MegafonSms {
    var $smsLogin;
    var $smsPassword;
    var $smsSender;
    var $text;
    var $phones = [];
    const senderUrl = "https://a2p-api.megalabs.ru/sms/v1/sms";
    /**
     * MegafonSms constructor.
     * @param string $smsLogin
     * @param string $smsPassword
     */
    public function __construct(string $smsLogin, string $smsPassword) {
        $this->smsLogin = $smsLogin;
        $this->smsPassword = $smsPassword;
    }
    /**
     * @param string $sender
     * @return $this
     */
    public function setSender(string $sender) {
        $this->smsSender = $sender;
        return $this;
    }
    /**
     * @param string $text
     * @return $this
     */
    public function setText(string $text) {
        $this->text = $text;
        return $this;
    }
    /**
     * @return bool
     */
    public function checkTimeout() {
        return true;
    }
    /**
     * @param string $phone
     * @return $this
     */
    public function addPhone(string $phone) {
        $clearPhone = self::preparePhone($phone);
        if (!in_array($clearPhone, $this->phones)) {
            $this->phones[] = $clearPhone;
        }
        return $this;
    }
    /**
     * @param string $phone
     * @return int
     */
    private static function preparePhone(string $phone) {
        $numeric_filtered = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
        $numeric_filtered = str_replace("+", "", $numeric_filtered);
        $numeric_filtered = str_replace("-", "", $numeric_filtered);
        if (strlen($numeric_filtered) > 10) {
            while (strlen($numeric_filtered) != 10) {
                $numeric_filtered = substr($numeric_filtered, 1);
            }
        }
        $preparedPhone = "7" . $numeric_filtered;
        return (int)$preparedPhone;
    }
    /**
     * @return bool
     * @throws \Exception
     */
    public function send() {
        if (!$this->smsLogin) {
            throw new \Exception('Не установлен логин');
        }
        if (!$this->smsPassword) {
            throw new \Exception('Не установлен пароль');
        }
        if (!$this->smsSender) {
            throw new \Exception('Не установлен текстовый отправитель');
        }
        if (!$this->text || strlen($this->text) == 0) {
            throw new \Exception('Не установлен текст сообщения');
        }
        if (!$this->phones || count($this->phones) == 0) {
            throw new \Exception('Не установлены получатели');
        }
        if (!$this->checkTimeout()) {
            return false;
        }
        print_r($this);
        foreach ($this->phones as $phone) {
            $this->sendSms($phone);
        }
        return true;
    }
    /**
     * @param $phone
     * @return bool|string
     */
    private function sendSms($phone) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array("from" => $this->smsSender, "message" => $this->text, "to" => $phone)));
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $this->smsLogin . ":" . $this->smsPassword);
        curl_setopt($curl, CURLOPT_URL, self::senderUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }
}
