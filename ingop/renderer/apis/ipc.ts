// TODO
export async function test(data): Promise<string> {
  return await global.ipcRenderer.invoke('message', data)
}
