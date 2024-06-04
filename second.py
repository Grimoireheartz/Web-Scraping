from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()

driver.get("https://toyota-isite.eu")

username_field = driver.find_element(By.XPATH, '//*[@id="input_1"]')
username_field.send_keys("external\exsuyat1")

password_field = driver.find_element(By.XPATH, '//*[@id="input_2"]')
password_field.send_keys("Donut31880")

password_field.send_keys(Keys.ENTER)

driver.get("https://toyota-isite.eu/Utilization/Index?menu=Utilization")

button = driver.find_element(By.XPATH, '//*[@id="SiteSelectorAction"]/div[1]/div[1]')
button.click()

# Select multiple sites
sites = [
    '//*[@id="ssOption-79721"]/a', #ampas
    '//*[@id="site66911"]', #Benz_samrong
    '//*[@id="site109505"]', #Benz_samutprakan
    '//*[@id="site76317"]', #DHL_CRG 
    '//*[@id="site113692"]', #DHL_DSC
    '//*[@id="site113419"]', #DHL_LOREAL
    '//*[@id="site103877"]', #Fuji Seal Bangpoo
    '//*[@id="site83435"]', #GPV_Asia_Bangpoo
    '//*[@id="site105912"]', #Nestle_Bangchan
    '//*[@id="site81669"]', #Nestle_Bangpoo
    '//*[@id="site109513"]', #Perfect_Saimai DC
    '//*[@id="site91850"]', #Powerbuy_Bangna
    '//*[@id="site105790"]', #Salee colour bangpoo
    '//*[@id="site53274"]', #Schneider Bangpoo
    '//*[@id="site126857"]', #Tripetch romklao
    '//*[@id="site80873"]', #UTI DSV Bangsaothong
    '//*[@id="site88979"]', #Watson Ticon Bangna
]

for site in sites:
    button = driver.find_element(By.XPATH, site)
    button.click()

time.sleep(5)

driver.get("https://toyota-isite.eu/Diagnostics/Machines?menu=Admin")

button = driver.find_element(By.XPATH, '//*[@id="searchButton"]')
button.click()
time.sleep(45)

body = driver.find_element(By.TAG_NAME, 'body')
outer_index = 1
inner_index = 1
time.sleep(3)

while True:
    body.send_keys(Keys.PAGE_DOWN)
    print("enter while loop !")

    xpath_expression = f'//*[@id="resultItems"]/div[{outer_index}]/div[{inner_index}]/div[1]/div[8]/a'
    row_expression = f'//*[@id="resultItems"]/div[{outer_index}]/div[{inner_index}]/div[1]'

    errors = driver.find_elements(By.XPATH, xpath_expression)
    row_elements = driver.find_elements(By.XPATH, row_expression)

    print("OUTER_INDEX =", outer_index, "INNER_INDEX =", inner_index)

    if not row_elements:
        # If no row elements found, assume we reached the end
        break

    row_style = row_elements[0]
    
    if row_style.get_attribute("style") == "display: none;" or not row_style.is_displayed() or row_style.get_attribute("style").find("opacity: 0.4") != -1:
        print(f"Row {outer_index}-{inner_index} has been removed or hidden.")
        inner_index += 1
        if inner_index > 50:
            outer_index += 1
            inner_index = 1
        continue

    for error in errors:
        print("Errors =", error.text)

    if len(errors) == 0:
        inner_index += 1
        if inner_index > 50:
            outer_index += 1
            inner_index = 1
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

    inner_index += 1
    if inner_index > 50:
        outer_index += 1
        inner_index = 1

    time.sleep(3)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, xpath_expression)))
    time.sleep(3)
