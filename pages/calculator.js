// حاسبة النفقة التقديرية - JavaScript
console.log('تم تحميل ملف JavaScript');

// تعريف الفئات العمرية ومعاملاتها المحدثة
const ageCategories = [
    { id: 'infant', label: 'أقل من سنتين', factor: 1.2 },
    { id: 'young', label: 'من 2 إلى 6 سنوات', factor: 1.1 },
    { id: 'school', label: 'من 7 إلى 12 سنة', factor: 1.1 },
    { id: 'teen', label: 'من 13 إلى 17 سنة', factor: 1.3 },
    { id: 'adult', label: '18 فأكثر (غير متزوج/غير عامل)', factor: 0.9 }
];

// دالة إنشاء حقول الفئات العمرية
function createAgeFields() {
    console.log('تم استدعاء دالة إنشاء حقول الفئات العمرية');
    
    const childrenCountInput = document.getElementById('childrenCount');
    const childrenAgeContainer = document.getElementById('childrenAgeContainer');
    const childrenAgeFields = document.getElementById('childrenAgeFields');
    
    if (!childrenCountInput || !childrenAgeContainer || !childrenAgeFields) {
        console.error('لم يتم العثور على العناصر المطلوبة');
        return;
    }
    
    const childrenCount = parseInt(childrenCountInput.value);
    console.log('عدد الأبناء:', childrenCount);
    
    if (isNaN(childrenCount) || childrenCount <= 0) {
        childrenAgeContainer.style.display = 'none';
        childrenAgeFields.innerHTML = '';
        return;
    }
    
    childrenAgeFields.innerHTML = '';
    
    for (let i = 0; i < childrenCount; i++) {
        const childField = document.createElement('div');
        childField.className = 'child-age-field';
        childField.style.marginBottom = '15px';
        childField.style.padding = '10px';
        childField.style.border = '1px solid #ddd';
        childField.style.borderRadius = '5px';
        
        const childTitle = document.createElement('h4');
        childTitle.textContent = `الطفل رقم ${i + 1}`;
        childTitle.style.color = '#4682b4';
        childTitle.style.marginBottom = '10px';
        childField.appendChild(childTitle);
        
        const selectGroup = document.createElement('div');
        selectGroup.className = 'form-group';
        
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', `childAge_${i}`);
        selectLabel.textContent = 'الفئة العمرية:';
        selectLabel.style.display = 'block';
        selectLabel.style.marginBottom = '5px';
        selectGroup.appendChild(selectLabel);
        
        const select = document.createElement('select');
        select.className = 'form-control';
        select.id = `childAge_${i}`;
        select.setAttribute('data-child-index', i);
        select.style.width = '100%';
        select.style.padding = '8px';
        select.style.border = '1px solid #ccc';
        select.style.borderRadius = '4px';
        
        ageCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.label;
            option.setAttribute('data-factor', category.factor);
            select.appendChild(option);
        });
        
        selectGroup.appendChild(select);
        childField.appendChild(selectGroup);
        childrenAgeFields.appendChild(childField);
    }
    
    childrenAgeContainer.style.display = 'block';
    console.log('تم إنشاء حقول الفئات العمرية بنجاح');
}

// دالة إظهار/إخفاء حقل الالتزامات
function toggleObligationsField() {
    const hasObligationsCheckbox = document.getElementById('hasObligations');
    const obligationsField = document.getElementById('obligationsField');
    
    if (hasObligationsCheckbox && obligationsField) {
        if (hasObligationsCheckbox.checked) {
            obligationsField.style.display = 'block';
        } else {
            obligationsField.style.display = 'none';
            const obligationsAmountInput = document.getElementById('obligationsAmount');
            if (obligationsAmountInput) {
                obligationsAmountInput.value = '';
            }
        }
    }
}

// دالة إظهار/إخفاء حقل الزوجة الأخرى
function toggleAnotherWifeField() {
    const hasAnotherWifeCheckbox = document.getElementById('hasAnotherWife');
    const anotherWifeField = document.getElementById('anotherWifeField');
    
    if (hasAnotherWifeCheckbox && anotherWifeField) {
        if (hasAnotherWifeCheckbox.checked) {
            anotherWifeField.style.display = 'block';
        } else {
            anotherWifeField.style.display = 'none';
            const hasChildrenFromAnotherWifeCheckbox = document.getElementById('hasChildrenFromAnotherWife');
            if (hasChildrenFromAnotherWifeCheckbox) {
                hasChildrenFromAnotherWifeCheckbox.checked = false;
            }
            toggleOtherChildrenField();
        }
    }
}

// دالة إظهار/إخفاء حقل أطفال الزوجة الأخرى
function toggleOtherChildrenField() {
    const hasChildrenFromAnotherWifeCheckbox = document.getElementById('hasChildrenFromAnotherWife');
    const otherChildrenField = document.getElementById('otherChildrenField');
    
    if (hasChildrenFromAnotherWifeCheckbox && otherChildrenField) {
        if (hasChildrenFromAnotherWifeCheckbox.checked) {
            otherChildrenField.style.display = 'block';
        } else {
            otherChildrenField.style.display = 'none';
            const otherChildrenCountInput = document.getElementById('otherChildrenCount');
            if (otherChildrenCountInput) {
                otherChildrenCountInput.value = '';
            }
        }
    }
}

// دالة حساب النفقة
function calculateAlimony() {
    console.log('بدء حساب النفقة');
    
    // جمع البيانات من النموذج
    const fatherIncome = parseFloat(document.getElementById('fatherIncome').value);
    const childrenCount = parseInt(document.getElementById('childrenCount').value);
    const includeHousingAllowance = document.getElementById('includeHousingAllowance').checked;
    const includeSeasonalIncrease = document.getElementById('includeSeasonalIncrease').checked;
    const hasObligations = document.getElementById('hasObligations').checked;
    const obligationsAmount = hasObligations ? parseFloat(document.getElementById('obligationsAmount').value) || 0 : 0;
    const hasAnotherWife = document.getElementById('hasAnotherWife').checked;
    const hasChildrenFromAnotherWife = hasAnotherWife ? document.getElementById('hasChildrenFromAnotherWife').checked : false;
    const otherChildrenCount = hasChildrenFromAnotherWife ? parseInt(document.getElementById('otherChildrenCount').value) || 0 : 0;
    const geographicLocation = document.getElementById('geographicLocation').value;
    
    // التحقق من صحة البيانات
    if (isNaN(fatherIncome) || fatherIncome <= 0) {
        alert('يرجى إدخال دخل صحيح للأب');
        return;
    }
    
    if (isNaN(childrenCount) || childrenCount <= 0) {
        alert('يرجى إدخال عدد صحيح للأبناء');
        return;
    }
    
    // حساب الدخل الصافي
    let netIncome = fatherIncome - obligationsAmount;
    if (netIncome < 150) {
        netIncome = 150; // الحد الأدنى
    }
    
    // حساب النفقة الأساسية
    let totalAlimony = 0;
    let housingAmount = 0;
    
    // حساب بدل السكن
    if (includeHousingAllowance) {
        housingAmount = netIncome * 0.08; // 8%
        totalAlimony += housingAmount;
    }
    
    // حساب نفقة الأطفال
    const childPercentage = includeHousingAllowance ? 5 : (includeHousingAllowance ? 6.5 : 9); // 9% بدون بدل سكن مستقل
    
    for (let i = 0; i < childrenCount; i++) {
        const childAgeSelect = document.getElementById(`childAge_${i}`);
        if (childAgeSelect) {
            const selectedOption = childAgeSelect.options[childAgeSelect.selectedIndex];
            const factor = parseFloat(selectedOption.getAttribute('data-factor'));
            const childAmount = netIncome * (childPercentage / 100) * factor;
            totalAlimony += childAmount;
        }
    }
    
    // إضافة عامل المنطقة الجغرافية
    if (geographicLocation === 'high_cost') {
        totalAlimony += netIncome * 0.02; // 2%
    }
    
    // تطبيق السقف الأعلى
    let maxPercentage = 40; // السقف العام
    if (netIncome < 600) {
        maxPercentage = 45;
    } else if (netIncome > 1500) {
        maxPercentage = 35;
    }
    
    const maxAmount = netIncome * (maxPercentage / 100);
    if (totalAlimony > maxAmount) {
        totalAlimony = maxAmount;
    }
    
    // خصم الأبناء من زوجة أخرى
    if (hasChildrenFromAnotherWife && otherChildrenCount > 0) {
        const deductionPercentage = Math.min(otherChildrenCount * 5, 15); // حد أقصى 15%
        const deductionAmount = totalAlimony * (deductionPercentage / 100);
        totalAlimony -= deductionAmount;
    }
    
    // حساب الزيادة الموسمية
    let seasonalIncreaseAmount = 0;
    if (includeSeasonalIncrease) {
        seasonalIncreaseAmount = totalAlimony * 0.25; // 25% (10% + 15%)
    }
    
    // عرض النتائج
    displayResults(netIncome, totalAlimony, seasonalIncreaseAmount, includeSeasonalIncrease);
    
    // عرض تفاصيل الحساب
    displayCalculationDetails(netIncome, housingAmount, childrenCount, includeHousingAllowance, childPercentage, geographicLocation, otherChildrenCount, totalAlimony, seasonalIncreaseAmount, includeSeasonalIncrease);
}

// دالة عرض النتائج
function displayResults(netIncome, finalAmount, seasonalIncreaseAmount, includeSeasonalIncrease) {
    const netIncomeResultSpan = document.querySelector('#netIncomeResult span');
    const alimonyResultSpan = document.querySelector('#alimonyResult span');
    const seasonalIncreaseResult = document.getElementById('seasonalIncreaseResult');
    const seasonalIncreaseResultSpan = document.querySelector('#seasonalIncreaseResult span');
    const resultContainer = document.getElementById('resultContainer');
    
    if (netIncomeResultSpan) {
        netIncomeResultSpan.textContent = Math.round(netIncome);
    }
    
    if (alimonyResultSpan) {
        alimonyResultSpan.textContent = Math.round(finalAmount);
    }
    
    if (includeSeasonalIncrease && seasonalIncreaseResult && seasonalIncreaseResultSpan) {
        seasonalIncreaseResultSpan.textContent = Math.round(finalAmount + seasonalIncreaseAmount);
        seasonalIncreaseResult.style.display = 'block';
    } else if (seasonalIncreaseResult) {
        seasonalIncreaseResult.style.display = 'none';
    }
    
    if (resultContainer) {
        resultContainer.style.display = 'block';
    }
    
    console.log('تم عرض النتائج بنجاح');
}

// دالة عرض تفاصيل الحساب
function displayCalculationDetails(netIncome, housingAmount, childrenCount, includeHousingAllowance, childPercentage, geographicLocation, otherChildrenCount, totalAlimony, seasonalIncreaseAmount, includeSeasonalIncrease) {
    const detailsContainer = document.getElementById('calculationDetails');
    if (!detailsContainer) return;
    
    let detailsHTML = '<div class="calculation-breakdown">';
    
    // بدل السكن
    if (includeHousingAllowance && housingAmount > 0) {
        detailsHTML += `<div class="detail-item">
            <span class="detail-label">🏠 بدل السكن المستقل:</span>
            <span class="detail-value">${Math.round(housingAmount)} ر.ع (8% من الدخل الصافي)</span>
        </div>`;
    } else if (!includeHousingAllowance) {
        const generalHousingAmount = netIncome * 0.09;
        detailsHTML += `<div class="detail-item">
            <span class="detail-label">🏠 بدل السكن ضمن النفقة العامة:</span>
            <span class="detail-value">${Math.round(generalHousingAmount)} ر.ع (9% من الدخل الصافي)</span>
        </div>`;
    }
    
    // نفقة الأطفال
    detailsHTML += '<div class="children-details">';
    for (let i = 0; i < childrenCount; i++) {
        const childAgeSelect = document.getElementById(`childAge_${i}`);
        if (childAgeSelect) {
            const selectedOption = childAgeSelect.options[childAgeSelect.selectedIndex];
            const factor = parseFloat(selectedOption.getAttribute('data-factor'));
            const ageText = selectedOption.text;
            const childAmount = netIncome * (childPercentage / 100) * factor;
            
            detailsHTML += `<div class="detail-item">
                <span class="detail-label">👶 الطفل رقم ${i + 1} (${ageText}):</span>
                <span class="detail-value">${Math.round(childAmount)} ر.ع (${childPercentage}% × ${factor})</span>
            </div>`;
        }
    }
    detailsHTML += '</div>';
    
    // عامل المنطقة الجغرافية
    if (geographicLocation === 'high_cost') {
        const geoAmount = netIncome * 0.02;
        detailsHTML += `<div class="detail-item">
            <span class="detail-label">🌍 عامل المنطقة الجغرافية:</span>
            <span class="detail-value">${Math.round(geoAmount)} ر.ع (2% إضافية)</span>
        </div>`;
    }
    
    // خصم الأبناء من زوجة أخرى
    if (otherChildrenCount > 0) {
        const deductionPercentage = Math.min(otherChildrenCount * 5, 15);
        const deductionAmount = totalAlimony * (deductionPercentage / 100);
        detailsHTML += `<div class="detail-item deduction">
            <span class="detail-label">➖ خصم الأبناء من زوجة أخرى:</span>
            <span class="detail-value">-${Math.round(deductionAmount)} ر.ع (${deductionPercentage}%)</span>
        </div>`;
    }
    
    // المجموع الأساسي
    detailsHTML += `<div class="detail-item total">
        <span class="detail-label">💰 المجموع الأساسي:</span>
        <span class="detail-value">${Math.round(totalAlimony)} ر.ع</span>
    </div>`;
    
    // الزيادة الموسمية
    if (includeSeasonalIncrease && seasonalIncreaseAmount > 0) {
        detailsHTML += `<div class="detail-item seasonal">
            <span class="detail-label">🎉 الزيادة الموسمية:</span>
            <span class="detail-value">${Math.round(seasonalIncreaseAmount)} ر.ع (25%)</span>
        </div>`;
        
        detailsHTML += `<div class="detail-item final-total">
            <span class="detail-label">🏆 المجموع مع الزيادة:</span>
            <span class="detail-value">${Math.round(totalAlimony + seasonalIncreaseAmount)} ر.ع</span>
        </div>`;
    }
    
    detailsHTML += '</div>';
    detailsContainer.innerHTML = detailsHTML;
}

// دالة عرض التسبيب المقترح للحكم
function showReasoningModal() {
    const fatherIncome = parseFloat(document.getElementById('fatherIncome').value) || 0;
    const includeHousingAllowance = document.getElementById('includeHousingAllowance').checked;
    const childrenCount = parseInt(document.getElementById('childrenCount').value) || 0;
    const hasObligations = document.getElementById('hasObligations').checked;
    const obligationsAmount = hasObligations ? parseFloat(document.getElementById('obligationsAmount').value) || 0 : 0;
    const hasAnotherWife = document.getElementById('hasAnotherWife').checked;
    const hasChildrenFromAnotherWife = hasAnotherWife ? document.getElementById('hasChildrenFromAnotherWife').checked : false;
    const otherChildrenCount = hasChildrenFromAnotherWife ? parseInt(document.getElementById('otherChildrenCount').value) || 0 : 0;
    const includeSeasonalIncrease = document.getElementById('includeSeasonalIncrease').checked;
    const geographicLocation = document.getElementById('geographicLocation').value;
    
    // حساب الدخل الصافي
    let netIncome = fatherIncome - obligationsAmount;
    if (netIncome < 150) {
        netIncome = 150;
    }
    
    // إنشاء نص التسبيب بالصياغة القانونية المطلوبة
    let reasoning = `ولما كانت المادة (١٣٠) من قانون الأحوال الشخصية تنص على أنه: "الحضانة من واجبات الأبوين معا ما دامت الزوجية قائمة بينهما، فإن افترقا فهي للأم، ثم للأب، ثم لأم الأم، ثم لأقرباء المحضون وفق الترتيب التالي: خالته، ثم جدته لأبيه وإن علت، ثم أخته ثم خالة أمه ثم عمة أمه ثم عمته، ثم عمة أبيه، ثم خالة أبيه، ثم بنت أخيه، ثم بنت أخته، ويقدم في الجميع الشقيق، ثم لأم، ثم لأب ما لم يقدر القاضي خلافه لمصلحة المحضون." وكانت المادة (١٣٢) من ذات القانون تنص على أنه: "إذا تركت الأم بيت الزوجية لخلاف أو غيره، فتكون الحضانة لها ما لم يقدر القاضي خلاف ذلك، وإذا كان المحضون صغيرا لا يستغني عن أمه تلزم بحضانته." كما أنه من المقرر قانونا بنص المادة (٤٤) من ذات القانون على أن: "تشمل النفقة الطعام والكسوة والمسكن والتطبيب وكل ما به مقومات حياة الانسان حسب العرف، وقد نصت المادة (٦٠/أ) من ذات القانون على أنه: " أ- نفقة الولد الصغير الذي لا مال له على أبيه، حتى تتزوج الفتاة، ويصل الفتى إلى الحد الذي يكتسب فيه أمثاله، ما لم يكن طالب علم يواصل دراسته بنجاح معتاد."، ومن المقرّر طبقاً للمادّة (٤٥) من ذات القانون أنه: "يراعى في تقدير النفقة سعة المنفق، وحال المنفق عليه، والوضع الاقتصادي زماناً ومكاناً، ومصداقاً لقوله تعالى (لِيُنفِقْ ذُو سَعَةٍ مِّن سَعَتِهِ وَمَن قُدِرَ عَلَيْهِ رِزْقُهُ فَلْيُنفِقْ مِمَّا آتَاهُ اللَّهُ لَا يُكَلِّفُ اللَّهُ نَفْساً إِلَّا مَا آتَاهَا سَيَجْعَلُ اللَّهُ بَعْدَ عُسْـرٍ يُسْـراً)، مما يؤكد من أنه بعد العسـر يأتي اليسـر والفرج، ولما كان كذلك وكان للمدعية `;
    
    // إضافة عدد الأبناء وأعمارهم
    if (childrenCount === 1) {
        reasoning += `طفل واحد`;
    } else if (childrenCount === 2) {
        reasoning += `طفلان`;
    } else {
        reasoning += `${childrenCount} أطفال`;
    }
    
    // إضافة تفاصيل الأعمار (سيتم تحديثها ديناميكياً حسب الإدخال)
    reasoning += `، وإنه وتبعاً للظروف المعيشية الحالية وحاجة المحضونين وتلبية لاحتياجاتهم، وحيث `;
    
    // إضافة تفاصيل الدخل والالتزامات
    if (hasObligations && obligationsAmount > 0) {
        reasoning += `قدم المدعى عليه للمحكمة ما يفيد استلامه لمرتب وقدره (${fatherIncome} ر.ع) `;
        reasoning += fatherIncome < 200 ? 'مائة' : (fatherIncome < 1000 ? '' : 'ألف');
        reasoning += ` ريال عماني وملتزم بسداد التزامات مالية بمبلغ وقدره (${obligationsAmount} ر.ع) `;
        reasoning += obligationsAmount < 200 ? 'مائة' : '';
        reasoning += ` ريال عماني`;
    } else {
        reasoning += `قدم المدعى عليه للمحكمة ما يفيد استلامه لمرتب وقدره (${fatherIncome} ر.ع) `;
        reasoning += fatherIncome < 200 ? 'مائة' : (fatherIncome < 1000 ? '' : 'ألف');
        reasoning += ` ريال عماني`;
    }
    
    // إضافة تفاصيل الزوجة الأخرى إن وجدت
    if (hasChildrenFromAnotherWife && otherChildrenCount > 0) {
        reasoning += `، فضلاً على زواجه من أخرى ولديه منها `;
        if (otherChildrenCount === 1) {
            reasoning += `ولد`;
        } else if (otherChildrenCount === 2) {
            reasoning += `ولدان`;
        } else {
            reasoning += `${otherChildrenCount} أولاد`;
        }
    }
    
    // حساب النفقة النهائية (نفس منطق الحساب الأساسي)
    let totalAlimony = 0;
    if (includeHousingAllowance) {
        totalAlimony += netIncome * 0.08;
    }
    
    const childPercentage = includeHousingAllowance ? 5 : (includeHousingAllowance ? 6.5 : 9);
    for (let i = 0; i < childrenCount; i++) {
        const childAgeSelect = document.getElementById(`childAge_${i}`);
        if (childAgeSelect) {
            const selectedOption = childAgeSelect.options[childAgeSelect.selectedIndex];
            const factor = parseFloat(selectedOption.getAttribute('data-factor'));
            totalAlimony += netIncome * (childPercentage / 100) * factor;
        }
    }
    
    if (geographicLocation === 'high_cost') {
        totalAlimony += netIncome * 0.02;
    }
    
    // تطبيق السقف
    let maxPercentage = 40;
    if (netIncome < 600) {
        maxPercentage = 45;
    } else if (netIncome > 1500) {
        maxPercentage = 35;
    }
    
    const maxAmount = netIncome * (maxPercentage / 100);
    if (totalAlimony > maxAmount) {
        totalAlimony = maxAmount;
        reasoning += `سادساً: تم تطبيق السقف الأعلى للنفقة بنسبة ${maxPercentage}% من الدخل الصافي.\n\n`;
    }
    
    if (hasChildrenFromAnotherWife && otherChildrenCount > 0) {
        const deductionPercentage = Math.min(otherChildrenCount * 5, 15);
        const deductionAmount = totalAlimony * (deductionPercentage / 100);
        totalAlimony -= deductionAmount;
    }
    
    // إضافة الخاتمة القانونية مع المبلغ المحكوم به
    reasoning += `، الأمر الذي تقضـي معه المحكمة بتقدير مبلغ النفقة `;
    
    if (includeHousingAllowance) {
        reasoning += `الشاملة للمسكن `;
    }
    
    reasoning += `شهريا (${Math.round(totalAlimony)} ر.ع) `;
    
    // تحويل المبلغ إلى كلمات (مبسط)
    const amountInWords = convertNumberToArabicWords(Math.round(totalAlimony));
    reasoning += `${amountInWords} ريال عماني`;
    
    if (includeSeasonalIncrease) {
        const seasonalAmount = totalAlimony * 0.25;
        const totalWithSeasonal = Math.round(totalAlimony + seasonalAmount);
        const seasonalInWords = convertNumberToArabicWords(totalWithSeasonal);
        reasoning += ` وتزاد في الأعياد والمدارس إلى مبلغ (${totalWithSeasonal} ر.ع) ${seasonalInWords} ريال عماني`;
    }
    
    reasoning += ` حسب ما سيرد في منطوق هذا القضاء.`;
    
    // عرض التسبيب في منطقة مخصصة
    const reasoningContainer = document.getElementById('reasoningResult');
    if (reasoningContainer) {
        reasoningContainer.innerHTML = `<div class="reasoning-content">
            <h4 style="color: #4682b4; margin-bottom: 1rem;">التسبيب المقترح للحكم:</h4>
            <div style="white-space: pre-line; line-height: 1.8; background: #f9f9f9; padding: 1.5rem; border-radius: 8px; border-right: 4px solid #4682b4;">
                ${reasoning}
            </div>
            <button onclick="copyReasoningText()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4682b4; color: white; border: none; border-radius: 4px; cursor: pointer;">
                نسخ النص
            </button>
        </div>`;
        reasoningContainer.style.display = 'block';
        
        // التمرير إلى منطقة التسبيب
        reasoningContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        // إذا لم توجد المنطقة المخصصة، استخدم alert كبديل
        alert(reasoning);
    }
}

// دالة تحويل الأرقام إلى كلمات عربية (مبسطة)
function convertNumberToArabicWords(num) {
    const ones = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
    const tens = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
    const hundreds = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
    
    if (num === 0) return 'صفر';
    if (num < 0) return 'سالب ' + convertNumberToArabicWords(-num);
    
    let result = '';
    
    // الآلاف
    if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        if (thousands === 1) {
            result += 'ألف ';
        } else if (thousands === 2) {
            result += 'ألفان ';
        } else if (thousands < 11) {
            result += ones[thousands] + ' آلاف ';
        } else {
            result += convertNumberToArabicWords(thousands) + ' ألف ';
        }
        num %= 1000;
    }
    
    // المئات
    if (num >= 100) {
        const hundredsDigit = Math.floor(num / 100);
        result += hundreds[hundredsDigit] + ' ';
        num %= 100;
    }
    
    // العشرات والآحاد
    if (num >= 20) {
        const tensDigit = Math.floor(num / 10);
        result += tens[tensDigit];
        num %= 10;
        if (num > 0) {
            result += ' و' + ones[num];
        }
    } else if (num >= 11) {
        const teens = ['أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
        result += teens[num - 11];
    } else if (num === 10) {
        result += 'عشرة';
    } else if (num > 0) {
        result += ones[num];
    }
    
    return result.trim();
}

// دالة نسخ نص التسبيب
function copyReasoningText() {
    const reasoningContent = document.querySelector('#reasoningResult .reasoning-content div');
    if (reasoningContent) {
        const textToCopy = reasoningContent.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('تم نسخ النص بنجاح!');
        }).catch(() => {
            // طريقة بديلة للنسخ
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('تم نسخ النص بنجاح!');
        });
    }
}

// دالة إعادة التعيين
function resetForm() {
    document.getElementById('alimonyForm').reset();
    
    const childrenAgeContainer = document.getElementById('childrenAgeContainer');
    const childrenAgeFields = document.getElementById('childrenAgeFields');
    const obligationsField = document.getElementById('obligationsField');
    const anotherWifeField = document.getElementById('anotherWifeField');
    const otherChildrenField = document.getElementById('otherChildrenField');
    const resultContainer = document.getElementById('resultContainer');
    const seasonalIncreaseResult = document.getElementById('seasonalIncreaseResult');
    const reasoningResult = document.getElementById('reasoningResult');
    const calculationDetails = document.getElementById('calculationDetails');
    
    if (childrenAgeContainer) childrenAgeContainer.style.display = 'none';
    if (childrenAgeFields) childrenAgeFields.innerHTML = '';
    if (obligationsField) obligationsField.style.display = 'none';
    if (anotherWifeField) anotherWifeField.style.display = 'none';
    if (otherChildrenField) otherChildrenField.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
    if (seasonalIncreaseResult) seasonalIncreaseResult.style.display = 'none';
    if (reasoningResult) reasoningResult.style.display = 'none';
    if (calculationDetails) calculationDetails.innerHTML = '';
}

// تهيئة الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة، بدء تهيئة الأحداث');
    
    // ربط الأحداث
    const childrenCountInput = document.getElementById('childrenCount');
    if (childrenCountInput) {
        childrenCountInput.addEventListener('input', createAgeFields);
        childrenCountInput.addEventListener('change', createAgeFields);
    }
    
    const hasObligationsCheckbox = document.getElementById('hasObligations');
    if (hasObligationsCheckbox) {
        hasObligationsCheckbox.addEventListener('change', toggleObligationsField);
    }
    
    const hasAnotherWifeCheckbox = document.getElementById('hasAnotherWife');
    if (hasAnotherWifeCheckbox) {
        hasAnotherWifeCheckbox.addEventListener('change', toggleAnotherWifeField);
    }
    
    const hasChildrenFromAnotherWifeCheckbox = document.getElementById('hasChildrenFromAnotherWife');
    if (hasChildrenFromAnotherWifeCheckbox) {
        hasChildrenFromAnotherWifeCheckbox.addEventListener('change', toggleOtherChildrenField);
    }
    
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateAlimony);
    }
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
    
    const reasoningBtn = document.getElementById('showReasoningBtn');
    if (reasoningBtn) {
        reasoningBtn.addEventListener('click', showReasoningModal);
    }
    
    console.log('تم ربط جميع الأحداث بنجاح');
});
