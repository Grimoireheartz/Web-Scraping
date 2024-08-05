from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta
import time

# สร้าง object driver สำหรับ Chrome
driver = webdriver.Chrome()


# เปิดเว็บไซต์ Toyota I-Site
driver.get("https://toyota-isite.eu")

# หาช่องกรอก username และพิมพ์ข้อมูล username
username_field = driver.find_element(By.XPATH, '//*[@id="input_1"]')
username_field.send_keys("external\exsuyat1")

# หาช่องกรอก password และพิมพ์ข้อมูล password
password_field = driver.find_element(By.XPATH, '//*[@id="input_2"]')
password_field.send_keys("Donut31880")

# กด Enter เพื่อเข้าสู่ระบบ
password_field.send_keys(Keys.ENTER)

# เปิดหน้า Utilization
driver.get("https://toyota-isite.eu/Utilization/Index?menu=Utilization")

# หาปุ่ม Site Selector และคลิก
button = driver.find_element(By.XPATH, '//*[@id="SiteSelectorAction"]/div[1]/div[1]')
button.click()

# เลือกหลายไซต์
sites = [
    '//*[@id="ssOption-79721"]/a', # ampas
    '//*[@id="site66911"]', # Benz_samrong
    '//*[@id="site109505"]', # Benz_samutprakan
    '//*[@id="site76317"]', # DHL_CRG 
    '//*[@id="site113692"]', # DHL_DSC
    '//*[@id="site113419"]', # DHL_LOREAL
    '//*[@id="site103877"]', # Fuji Seal Bangpoo
    '//*[@id="site83435"]', # GPV_Asia_Bangpoo
    '//*[@id="site105912"]', # Nestle_Bangchan
    '//*[@id="site81669"]', # Nestle_Bangpoo
    '//*[@id="site109513"]', # Perfect_Saimai DC
    '//*[@id="site91850"]', # Powerbuy_Bangna
    '//*[@id="site105790"]', # Salee colour bangpoo
    '//*[@id="site53274"]', # Schneider Bangpoo
    '//*[@id="site126857"]', # Tripetch romklao
    '//*[@id="site80873"]', # UTI DSV Bangsaothong
    '//*[@id="site88979"]', # Watson Ticon Bangna
]

# คลิกเพื่อเลือกแต่ละไซต์ที่อยู่ในรายการ sites
for site in sites:
    button = driver.find_element(By.XPATH, site)
    button.click()

# รอ 5 วินาที
time.sleep(5)

# เปิดหน้า Diagnostics Machines
driver.get("https://toyota-isite.eu/Diagnostics/Machines?menu=Admin")

# หาปุ่มค้นหาแล้วคลิก
button = driver.find_element(By.XPATH, '//*[@id="searchButton"]')
button.click()

# รอ 45 วินาทีให้ข้อมูลโหลด
time.sleep(45)

# หา element body ของหน้าเว็บ
body = driver.find_element(By.TAG_NAME, 'body')

# ตั้งค่า index สำหรับวน loop
outer_index = 1
inner_index = 1

# รอ 3 วินาที
time.sleep(3)

# เริ่ม loop ตรวจสอบข้อมูล
while True:
    # เลื่อนหน้าจอลง
    body.send_keys(Keys.PAGE_DOWN)
    print("enter while loop !")

    # สร้าง XPath expression สำหรับหา errors และ row
    xpath_expression = f'//*[@id="resultItems"]/div[{outer_index}]/div[{inner_index}]/div[1]/div[8]/a'
    row_expression = f'//*[@id="resultItems"]/div[{outer_index}]/div[{inner_index}]/div[1]'

    # หาจำนวน errors ในหน้า
    errors = driver.find_elements(By.XPATH, xpath_expression)
    row_elements = driver.find_elements(By.XPATH, row_expression)

    print("OUTER_INDEX =", outer_index, "INNER_INDEX =", inner_index)

    # ถ้าไม่มี row elements แสดงว่าไปถึงจุดสิ้นสุด
    if not row_elements:
        break

    row_style = row_elements[0]

    # ถ้าแถวถูกซ่อนไว้หรือแสดงไม่ครบ ก็ข้ามไปแถวถัดไป
    if row_style.get_attribute("style") == "display: none;" or not row_style.is_displayed() or row_style.get_attribute("style").find("opacity: 0.4") != -1:
        print(f"Row {outer_index}-{inner_index} has been removed or hidden.")
        inner_index += 1
        if inner_index > 50:
            outer_index += 1
            inner_index = 1
        continue

    # แสดงจำนวน errors ใน console
    for error in errors:
        print("Errors =", error.text)

    # ถ้าไม่มี errors ในแถวนี้ ข้ามไปแถวถัดไป
    if len(errors) == 0:
        inner_index += 1
        if inner_index > 50:
            outer_index += 1
            inner_index = 1
        continue

    # ตรวจสอบแต่ละ error ใน errors
    for error in errors:
        if int(error.text) > 0:
            # คลิกขวาแล้วเปิดใน tab ใหม่
            ActionChains(driver).context_click(error).perform()
            driver.execute_script("window.open(arguments[0], '_blank');", error.get_attribute("href"))
            time.sleep(3)
            driver.switch_to.window(driver.window_handles[-1])
            time.sleep(3)

            # ตั้งค่าวันที่ในการค้นหา
            today = datetime.now()
            from_date = (today - timedelta(days=2)).strftime("%m/%d/%Y")
            to_date = today.strftime("%m/%d/%Y")

            # หาช่องกรอกวันที่และพิมพ์วันที่
            from_date_field = driver.find_element(By.XPATH, '//*[@id="fromDate"]')
            to_date_field = driver.find_element(By.XPATH, '//*[@id="endDate"]')

            from_date_field.clear()
            from_date_field.send_keys(from_date)

            to_date_field.clear()
            to_date_field.send_keys(to_date)

            # หาปุ่มค้นหาและคลิก
            search_button = driver.find_element(By.XPATH, '//*[@id="searchButton"]')  # ปรับ XPath ให้ตรงกับปุ่มจริง
            search_button.click()

            # รอ 10 วินาทีแล้วเลื่อนหน้าจอลง
            time.sleep(10)
            driver.execute_script("window.scrollBy(0, 200);")


            try:
            # ถ้าหาส่วน SVG เจอให้คลิก
                svg_element = driver.find_element(By.CSS_SELECTOR, "#reportGenerator > svg")
                actions = ActionChains(driver)
                actions.move_to_element(svg_element).click().perform()

            # รอ 5 วินาทีแล้วปิด tab ปัจจุบัน
                time.sleep(5)
                driver.close()
                driver.switch_to.window(driver.window_handles[0])

            except Exception as e:
            
             # ถ้าหาไม่เจอ รอ 5 วินาทีแล้วปิด tab ปัจจุบัน
                time.sleep(5)
                driver.close()
                driver.switch_to.window(driver.window_handles[0])

    # เพิ่มค่า index เพื่อไปแถวถัดไป
    inner_index += 1
    if inner_index > 50:
        outer_index += 1
        inner_index = 1

    # รอ 3 วินาทีแล้วตรวจสอบว่ามี element ที่เราต้องการในหน้าหรือไม่
    time.sleep(3)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, xpath_expression)))
    time.sleep(3)
