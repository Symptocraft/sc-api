import { ObjectId } from "mongodb";

type SymptomOccurence = {
    symptomId: ObjectId,
    illnessId: ObjectId,
    userId: ObjectId,
    occurenceStartDate: Date,
    occurenceEndDate: Date
};

export { SymptomOccurence };