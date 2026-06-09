export const checkValidVersion = (version: string) =>
  /^\d+\.\d+\.\d+$/.test(version);

export const checkValidMachineId = (machineId: string) =>
  /^[a-f0-9\-]+$/i.test(machineId);
