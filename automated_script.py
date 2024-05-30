import schedule
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def login(driver):
    driver.get("https://toyota-isite.eu")
    
    try:
        username_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="input_1"]')))
        username_field.send_keys("external\\exsuyat1")
        
        password_field = driver.find_element(By.XPATH, '//*[@id="input_2"]')
        password_field.send_keys("Donut31880")
        password_field.send_keys(Keys.ENTER)
    except Exception as e:
        print(f"Login failed: {e}")

def navigate_to_utilization(driver):
    try:
        driver.get("https://toyota-isite.eu/Utilization/Index?menu=Utilization")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="SiteSelectorAction"]/div[1]/div[1]'))).click()
        
        site_buttons = [
            '//*[@id="ssOption-79721"]/a', '//*[@id="site66911"]', '//*[@id="site109505"]',
            '//*[@id="site76317"]', '//*[@id="site113692"]', '//*[@id="site113419"]',
            '//*[@id="site103877"]', '//*[@id="site83435"]', '//*[@id="site105912"]',
            '//*[@id="site81669"]', '//*[@id="site109513"]', '//*[@id="site91850"]',
            '//*[@id="site105790"]', '//*[@id="site53274"]', '//*[@id="site126857"]',
            '//*[@id="site80873"]', '//*[@id="site88979"]'
        ]
        
        for xpath in site_buttons:
            WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath))).click()
        
    except Exception as e:
        print(f"Navigation failed: {e}")

def navigate_to_diagnostics(driver):
    try:
        driver.get("https://toyota-isite.eu/Diagnostics/Machines?menu=Admin")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="searchButton"]'))).click()
        time.sleep(45)
    except Exception as e:
        print(f"Diagnostics navigation failed: {e}")

def check_errors(driver):
    body = driver.find_element(By.TAG_NAME, 'body')
    index = 0

    while True:
        body.send_keys(Keys.PAGE_DOWN)
        print("enter while loop!")
        
        xpath_expression = f'//*[@id="resultItems"]/div[1]/div[{index + 1}]/div[1]/div[8]/a'
        errors = driver.find_elements(By.XPATH, xpath_expression)
        
        print("INDEX =", index)
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
                time.sleep(3)
                
                driver.execute_script("window.scrollBy(0, 200);")
                svg_element = driver.find_element(By.CSS_SELECTOR, "#reportGenerator > svg")
                actions = ActionChains(driver)
                actions.move_to_element(svg_element).click().perform()
                
                time.sleep(10)
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
        
        index += 1
        time.sleep(3)
        try:
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, xpath_expression)))
        except Exception as e:
            print(f"Waiting for next element failed: {e}")
        time.sleep(3)

def run_script():
    driver = webdriver.Chrome()
    try:
        login(driver)
        navigate_to_utilization(driver)
        navigate_to_diagnostics(driver)
        check_errors(driver)
    finally:
        driver.quit()

# Schedule the job to run every hour
schedule.every().hour.do(run_script)

while True:
    schedule.run_pending()
    time.sleep(1)
