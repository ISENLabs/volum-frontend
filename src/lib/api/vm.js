// src/lib/api/vm.js
import client from './client';

// list vms
export async function getVMs() {
    const response = await client.get('/vms');
    return response.data;
}

// get 1 vm
export async function getVM(id) {
    const response = await client.get(`/vms/${id}`);
    return response.data;
}

// create new vm
export async function createVM(data) {
    const response = await client.post('/vms', data);
    return response.data;
}

// start vm
export async function startVM(id) {
    const response = await client.post(`/vms/${id}/start`);
    return response.data;
}

// stop vm
export async function stopVM(id) {
    const response = await client.post(`/vms/${id}/stop`);
    return response.data;
}

// delete vm
export async function deleteVM(id) {
    const response = await client.post(`/vms/${id}`, '{"delete":true}');
    return response.data;
}
