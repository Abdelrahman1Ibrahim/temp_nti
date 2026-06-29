interface Patient {
  name: string;
  severity: number;
  hasData: boolean;
  condition: "normal" | "critical";
}

interface TriageResult {
  treatedImmediately: Patient[];
  normalTreated: Patient[];
  missingDataList: Patient[];
}

function triagePatients(patients: Patient[]): TriageResult {
  const missingDataList: Patient[] = [];
  const treatedImmediately: Patient[] = [];
  const normalTreated: Patient[] = [];

  for (const patient of patients) {
    if (!patient.hasData) {
      missingDataList.push(patient);
      continue;
    }

    if (patient.condition === "critical") {
      treatedImmediately.push(patient);
    } else {
      normalTreated.push(patient);
    }
  }

  normalTreated.sort(
    (firstPatient, secondPatient) =>
      secondPatient.severity - firstPatient.severity,
  );

  return {
    treatedImmediately,
    normalTreated,
    missingDataList,
  };
}
