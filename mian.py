from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()

driver.get("https://toyota-isite.eu")


time.sleep(5)

username_field = driver.find_element(By.XPATH, '//*[@id="input_1"]')
username_field.send_keys("external\exsuyat1")

password_field = driver.find_element(By.XPATH, '//*[@id="input_2"]')
password_field.send_keys("Donut5821270015")

password_field.send_keys(Keys.ENTER)

driver.get("https://toyota-isite.eu/Utilization/Index?menu=Utilization")

button = driver.find_element(By.XPATH, '//*[@id="SiteSelectorAction"]/div[1]/div[1]')
button.click()

button = driver.find_element(By.XPATH, '//*[@id="selectAllSites"]/a')
button.click()

#time.sleep(5)

driver.get("https://toyota-isite.eu/Diagnostics/Machines?menu=Admin")

button = driver.find_element(By.XPATH, '//*[@id="searchButton"]')
button.click()

#time.sleep(50)

element = driver.find_element(By.TAG_NAME, 'body')


while True:
    element.send_keys(Keys.PAGE_DOWN)
    time.sleep(3)

#print(driver.page_source)

#driver.quit()

