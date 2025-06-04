// Seletores de elementos do DOM
const cnpjForm = document.getElementById('cnpjForm');
const cnpjInput = document.getElementById('cnpj');
const resultsDiv = document.getElementById('results');
const cnpjDataContainer = document.getElementById('cnpjDataContainer');
const loadingDiv = document.getElementById('loading');
const errorMessageDiv = document.getElementById('errorMessage');

// Mapeamento de chaves da API para rótulos amigáveis
const fieldLabels = {
    "abertura": "Data de Abertura",
    "situacao": "Situação",
    "tipo": "Tipo",
    "nome": "Nome Empresarial",
    "fantasia": "Nome Fantasia",
    "porte": "Porte",
    "natureza_juridica": "Natureza Jurídica",
    "logradouro": "Logradouro",
    "numero": "Número",
    "complemento": "Complemento",
    "cep": "CEP",
    "bairro": "Bairro",
    "municipio": "Município",
    "uf": "UF",
    "email": "E-mail",
    "telefone": "Telefone",
    "efr": "EFR",
    "motivo_situacao": "Motivo Situação",
    "situacao_especial": "Situação Especial",
    "data_situacao_especial": "Data Situação Especial",
    "capital_social": "Capital Social",
    "ultima_atualizacao": "Última Atualização",
    "status": "Status (API)",
    "cnpj": "CNPJ (Consultado)",
    "qsa": "Quadro de Sócios e Administradores",
    "atividade_principal": "Atividade Principal",
    "atividades_secundarias": "Atividades Secundárias",
    "code": "Código",
    "text": "Descrição",
    "qual": "Qualificação",
};

// Função para criar e adicionar campos de resultado com novo estilo
function createField(label, value) {
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'result-field-group p-3 rounded-md animate-fadeIn';

    const labelElement = document.createElement('div');
    labelElement.className = 'result-field-label text-xs uppercase tracking-wider mb-1';
    labelElement.textContent = label;
    fieldGroup.appendChild(labelElement);

    const valueElement = document.createElement('input');
    valueElement.type = 'text';
    valueElement.value = value;
    valueElement.readOnly = true;
    valueElement.className = 'w-full px-3 py-1.5 rounded-md shadow-sm text-sm result-field-value focus:outline-none';
    valueElement.addEventListener('click', function() {
        this.select();
        try {
            document.execCommand('copy');
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = '#2d57a0';
            setTimeout(() => { this.style.backgroundColor = originalBg; }, 300);
        } catch (err) {
            console.warn('Não foi possível copiar automaticamente.');
        }
    });
    fieldGroup.appendChild(valueElement);
    return fieldGroup;
}

// Função para exibir os dados do CNPJ no container
function displayCnpjData(data) {
    cnpjDataContainer.innerHTML = '';
    resultsDiv.style.opacity = 0; 

    function processEntry([key, value], parentContainer, parentKey = '') {
        const label = fieldLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                const sectionTitle = document.createElement('h3');
                sectionTitle.className = 'text-lg font-semibold text-blue-400 mt-5 mb-2 col-span-3 border-t border-gray-700 pt-3 futuristic-title text-opacity-80';
                sectionTitle.textContent = fieldLabels[parentKey] || label;
                parentContainer.appendChild(sectionTitle);

                if (value.length === 0) {
                     parentContainer.appendChild(createField(label, "Nenhuma informação disponível"));
                } else {
                    value.forEach((item, index) => {
                        const itemContainer = document.createElement('div');
                        itemContainer.className = 'ml-4 pl-4 border-l-2 border-gray-700 animate-fadeIn';
                        parentContainer.appendChild(itemContainer);

                        if (typeof item === 'object' && item !== null) {
                            const itemTitleText = item.nome || item.text || (item.code ? `${fieldLabels['code']}: ${item.code}` : `Item ${index + 1}`);
                            const itemTitle = document.createElement('p');
                            itemTitle.className = 'text-sm font-medium text-gray-400 mt-2 mb-1';
                            itemTitle.textContent = itemTitleText;
                            itemContainer.appendChild(itemTitle);
                            Object.entries(item).forEach(entry => {
                                if (entry[0] !== 'nome' && entry[0] !== 'text' && !(entry[0] === 'code' && item.code === itemTitleText.split(': ')[1])) {
                                    processEntry(entry, itemContainer, key);
                                }
                            });
                        } else {
                            itemContainer.appendChild(createField(`${label} ${index + 1}`, item));
                        }
                    });
                }
            } else {
                Object.entries(value).forEach(entry => processEntry(entry, parentContainer, key));
            }
        } else {
            parentContainer.appendChild(createField(label, value !== null && value !== undefined ? value : "N/A"));
        }
    }
    Object.entries(data).forEach(entry => processEntry(entry, cnpjDataContainer));
    resultsDiv.style.display = 'block';
    void resultsDiv.offsetWidth;
    resultsDiv.style.opacity = 1;
    resultsDiv.classList.add('animate-slideInUp');
}

// Função para validar CNPJ (dígitos verificadores)
function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if (cnpj == '') return false;
    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
        
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
        
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
          
    return true;
}

// Adiciona o listener para o evento de submit do formulário
cnpjForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    resultsDiv.style.display = 'none';
    resultsDiv.classList.remove('animate-slideInUp');
    cnpjDataContainer.innerHTML = '';
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';
    loadingDiv.style.display = 'block';

    let cnpj = cnpjInput.value.replace(/\D/g, '');

    if (cnpj.length !== 14 || !isValidCNPJ(cnpj)) {
        errorMessageDiv.textContent = 'CNPJ inválido. Verifique o número e tente novamente.';
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.classList.add('animate-fadeIn');
        loadingDiv.style.display = 'none';
        return;
    }
    errorMessageDiv.classList.remove('animate-fadeIn');

    const targetUrl = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    // Alterado o proxy CORS
    const apiUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

    try {
        const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

        if (!response.ok) {
            let errorText = `Erro na requisição: ${response.status} ${response.statusText}`;
            try {
                // Tenta obter uma mensagem de erro mais detalhada do corpo da resposta
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorText = `Erro: ${errorData.message} (Status: ${errorData.status || response.status})`;
                } else if (typeof errorData === 'string' && errorData.length < 200) { // Evita mensagens de erro HTML longas
                    errorText = errorData;
                }
            } catch (e) {
                // Se não conseguir parsear o JSON do erro, usa o statusText.
                // Pode ser que o proxy tenha retornado HTML de erro, por exemplo.
                console.warn("Não foi possível parsear a resposta de erro como JSON:", e);
                 try {
                    const textError = await response.text(); // Tenta ler como texto puro
                    if (textError && textError.length < 500) { // Limita o tamanho para evitar HTML grande
                        console.error("Resposta de erro (texto):", textError);
                        // Não define errorText aqui para não sobrescrever o statusText se for HTML grande
                    }
                } catch (textEx) {
                    // Ignora se não conseguir ler como texto
                }
            }
            throw new Error(errorText);
        }

        // Processa a resposta JSON diretamente (sem o wrapper 'contents' do proxy anterior)
        const actualData = await response.json();

        if (actualData.status === "ERROR") {
            throw new Error(actualData.message || "Erro ao consultar o CNPJ na API ReceitaWS.");
        }
        if (actualData.status === "OK") {
            displayCnpjData(actualData);
        } else {
            // Trata outros status ou respostas inesperadas da API ReceitaWS
            throw new Error(actualData.message || "Resposta inesperada da API ReceitaWS. Verifique os dados retornados.");
        }

    } catch (error) {
        console.error('Falha ao buscar CNPJ:', error);
        // A mensagem de erro agora deve ser mais informativa se veio do bloco !response.ok
        errorMessageDiv.textContent = `${error.message}. Verifique o CNPJ ou tente novamente.`;
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.classList.add('animate-fadeIn');
    } finally {
        loadingDiv.style.display = 'none';
    }
});

// Adiciona máscara simples ao campo CNPJ
cnpjInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 14);
    let formattedValue = '';
    if (value.length > 2) {
        formattedValue += value.substring(0, 2) + '.';
        if (value.length > 5) {
            formattedValue += value.substring(2, 5) + '.';
            if (value.length > 8) {
                formattedValue += value.substring(5, 8) + '/';
                if (value.length > 12) {
                    formattedValue += value.substring(8, 12) + '-' + value.substring(12, 14);
                } else {
                    formattedValue += value.substring(8,12);
                }
            } else {
                formattedValue += value.substring(5);
            }
        } else {
            formattedValue += value.substring(2);
        }
    } else {
        formattedValue = value;
    }
    e.target.value = formattedValue;
});
