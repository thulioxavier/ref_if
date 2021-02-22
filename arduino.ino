#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16,2);
 
int umidade;
  
void setup()
{
 Serial.begin(9600);
 lcd.init();                 // Inicializando o LCD
 lcd.backlight();
 pinMode(13, OUTPUT);
 }
void loop()
{
  
  digitalWrite(13, LOW);
  lcd.setCursor(0, 0);
  
  umidade = analogRead(A0);
  
  umidade = map(umidade, 1024, 0, 0, 200);
  lcd.print("Umidade em:");
  lcd.print(umidade);
  Serial.println("%");
  Serial.print(umidade);
  lcd.print(" %");
  if(umidade <=70 )
  {
       digitalWrite(13, HIGH);
       lcd.setCursor(0, 1);
       lcd.print("Moderado");
  }
  delay(500);
  lcd.clear();
}