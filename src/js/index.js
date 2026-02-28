// Carrega valores do localStorage se existirem
document.getElementById('api-url').value = localStorage.getItem('sb_url') || '';
document.getElementById('api-key').value = localStorage.getItem('sb_key') || '';

async function fetchData() {
    const grid = document.getElementById('items-grid');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Captura valores dos inputs
    const API_URL = document.getElementById('api-url').value.trim();
    const API_KEY = document.getElementById('api-key').value.trim();

    if (!API_URL || !API_KEY) {
        alert("Por favor, preencha a URL e a Key da API.");
        return;
    }

    // Salva no localStorage para não ter que digitar sempre
    localStorage.setItem('sb_url', API_URL);
    localStorage.setItem('sb_key', API_KEY);

    // Reset UI
    grid.innerHTML = '';
    errorDiv.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'apikey': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: "Functions" })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Falha na requisição (Status: ${response.status})`);
        }

        const data = await response.json();
        renderItems(data);
    } catch (err) {
        errorText.innerText = err.message;
        errorDiv.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function renderItems(items) {
    const grid = document.getElementById('items-grid');
    
    if (!items || items.length === 0) {
        grid.innerHTML = '<p class="text-center col-span-full text-gray-400 py-10">A tabela retornou uma lista vazia.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all duration-300 flex flex-col";
        
        // Extrai o nome em PT-BR do JSONB ou usa o unique_name como fallback
        const name_pt = item.localized_names && item.localized_names["PT-BR"] 
                        ? item.localized_names["PT-BR"] 
                        : 'Nome não disponível';

        card.innerHTML = `
            <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900 leading-tight">${name_pt}</h3>
            </div>

            <div class="flex justify-between items-start mb-4">
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase w-fit">Item #${item.id}</span>
                    <span class="text-[10px] text-gray-400 italic font-mono">${item.unique_name}</span>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-1 border border-gray-100">
                    <img src="https://render.albiononline.com/v1/item/${item.unique_name}.png" 
                            alt="${name_pt}" 
                            class="w-32 h-32 object-contain"
                            onerror="this.src='https://via.placeholder.com/48?text=N/A'">
                </div>
            </div>
            
            <h4 class="text-[10px] font-semibold text-gray-400 uppercase mb-1">Localização</h4>
            <p class="text-xs text-gray-500 mb-4 truncate" title="${item.localization_name_variable}">
                VAR: ${item.localization_name_variable || 'N/A'}
            </p>
            
            <div class="mt-auto space-y-2">
                <div class="text-[10px] text-gray-400 font-semibold uppercase">Dados Localizados (JSONB)</div>
                <div class="bg-gray-900 rounded-lg p-3 overflow-hidden">
                    <pre class="text-green-400 text-[10px] overflow-x-auto leading-relaxed">${JSON.stringify(item.localized_names || {}, null, 2)}</pre>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}