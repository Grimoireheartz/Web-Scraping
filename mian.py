from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
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

"""
button = driver.find_element(By.XPATH, '//*[@id="selectAllSites"]/a')
button.click()

"""
button = driver.find_element(By.XPATH, '//*[@id="ssOption-79721"]/a') #ampas
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site66911"]')#Benz_samrong
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site109505"]')#Benz_samutprakan
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site76317"]')#DHL_CRG 
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site113692"]')#DHL_DSC
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site113419"]')#DHL_LOREAL
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site103877"]')#Fuji Seal Bangpoo
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site83435"]')#GPV_Asia_Bangpoo
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site105912"]')#Nestle_Bangchan
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site81669"]')#Nestle_Bangpoo
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site109513"]')#Perfect_Saimai DC
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site91850"]')#Powerbuy_Bangna
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site105790"]')#Salee colour bangpoo
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site53274"]')#Schneider Bangpoo
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site126857"]')#Tripetch romklao
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site80873"]')#UTI DSV Bangsaothong
button.click()
button = driver.find_element(By.XPATH, '//*[@id="site88979"]')#Watson Ticon Bangna
button.click()

time.sleep(5)

driver.get("https://toyota-isite.eu/Diagnostics/Machines?menu=Admin")

button = driver.find_element(By.XPATH, '//*[@id="searchButton"]')
button.click()


time.sleep(45)
body = driver.find_element(By.TAG_NAME, 'body')
#body.send_keys(Keys.PAGE_DOWN)
index = 0 
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
    
    if len(errors) == 0:
        continue

    for error in errors: 
        if int(error.text) > 0:
            ActionChains(driver).context_click(error).perform()
            driver.execute_script("window.open(arguments[0], '_blank');", error.get_attribute("href"))
            time.sleep(3)
            driver.switch_to.window(driver.window_handles[-1])
            time.sleep(5)

            svg_element = driver.find_element(By.CSS_SELECTOR, "#reportGenerator > svg")
            actions = ActionChains(driver)
            actions.move_to_element(svg_element).click().perform()

            time.sleep(10)
            driver.close()
            driver.switch_to.window(driver.window_handles[0])
            body.send_keys(Keys.PAGE_DOWN)
         

    index += 1

    time.sleep(3)

    scrolled = False
    while not scrolled:
        try:
            body.send_keys(Keys.PAGE_DOWN)
            scrolled = True
        except Exception as e:
            print("Error occurred while scrolling:", e)
            time.sleep(1)

