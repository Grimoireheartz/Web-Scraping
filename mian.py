from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import time

driver = webdriver.Chrome()

driver.get("https://toyota-isite.eu")

time.sleep(5)

username_field = driver.find_element(By.XPATH, '//*[@id="input_1"]')
username_field.send_keys("external\exsuyat1")

password_field = driver.find_element(By.XPATH, '//*[@id="input_2"]')
password_field.send_keys("Donut31880")

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


time.sleep(40)
body = driver.find_element(By.TAG_NAME, 'body')
body.send_keys(Keys.PAGE_DOWN)
index = 1 
time.sleep(3)

#while True:
for i in range(10):

    body.send_keys(Keys.PAGE_DOWN)

    print("enter while loop !")

    xpath_expression = '//*[@id="resultItems"]/div[1]/div[{}]/div[1]/div[8]/a'.format(index + 1)

    errors = driver.find_elements(By.XPATH, xpath_expression)
    
    print("INDEX = ", index)
    for error in errors:
        print("Errors =", error.text)
    
    # Check if the 'errors' list is empty
    if len(errors) == 0:
        continue

    # Process the 'errors' list if it's not empty
    for error in errors: 
        if int(error.text) > 0:
            ActionChains(driver).context_click(error).perform()
            ActionChains(driver).send_keys('t').perform()
    
    index += 1

    time.sleep(3)

      # ตรวจสอบว่ามีการเลื่อนหน้าจอขึ้นไปหรือไม่
    scrolled = False
    while not scrolled:
        try:
            body.send_keys(Keys.PAGE_DOWN)
            scrolled = True
        except Exception as e:
            # หากเกิดข้อผิดพลาดระหว่างการเลื่อนหน้าจอ รอสักครู่แล้วลองอีกครั้ง
            print("Error occurred while scrolling:", e)
            time.sleep(1)

