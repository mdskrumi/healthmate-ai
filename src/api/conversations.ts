import { API_URL_CONVERSATIONS } from "./config";

export interface ISendConversation {
  patient: number;
  conversation: IMessage[];
}

export interface IMessage {
  speaker: "Doctor" | "Patient";
  message: string;
}

export const sendConversation = async (data: ISendConversation) => {
  try {
    const response = await fetch(API_URL_CONVERSATIONS, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    console.log({ jsonResponse });
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
};

export const getSummarizeList = async () => {
  try {
    const response = await fetch(API_URL_CONVERSATIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    console.log({ jsonResponse });
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
};

export const getSummarizeOfPatient = async (patinet: number) => {
  try {
    const response = await fetch(`${API_URL_CONVERSATIONS}${patinet}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    console.log({ jsonResponse });
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
};

const dataList = {
  id: 30,
  conversation: [
    {
      speaker: "Doctor",
      message: "",
    },
    {
      speaker: "Doctor",
      message: "good afternoon how are you feeling",
    },
    {
      speaker: "Patient",
      message: "I am not feeling well",
    },
    {
      speaker: "Doctor",
      message: "okay what is your problem",
    },
    {
      speaker: "Patient",
      message: "I am feeling severe headache",
    },
  ],
  summarize:
    "Patient's problems: Severe headache.\n\nSuggested tests: None mentioned.",
  created_at: "2023-06-13T13:10:59.821184Z",
  updated_at: "2023-06-13T13:10:59.821158Z",
  patient: {
    id: 4,
    name: "Kabir",
  },
};

const dataPatient = {
  status: "success",
  data: {
    count: 12,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "During a doctor's visit, the patient complains of a sore throat and moderate fever. The doctor uses a new thermometer that doesn't require cleaning after every use and determines the patient's blood pressure is fine. The doctor suggests a blood test for malaria, as there have been recent cases in the area, but mentions that it is likely negative. The doctor prescribes three medicines and a syrup with instructions on when to take them. The patient has no further questions and thanks the doctor.",
        created_at: "2023-06-05T10:10:55.614384Z",
        updated_at: "2023-06-05T10:10:55.614170Z",
      },
      {
        id: 2,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "During the conversation, the patient informs the doctor of their symptoms of a sore throat and fever. The doctor checks their temperature and blood pressure, and suspects symptoms of malaria. The doctor prescribes three medicines and a syrup for the patient to take as a precautionary measure. The patient has no further questions and thanks the doctor.",
        created_at: "2023-06-05T10:11:48.685660Z",
        updated_at: "2023-06-05T10:11:48.685594Z",
      },
      {
        id: 3,
        conversation: [
          {
            speaker: "Patient",
            message:
              "Hi doctor, I am a 22-year-old female who often suffers constipation to the point where I feel like I get minor external hemorrhoids that often bleed. Again, I have not got doctor verification for this but that is what I think. Recently, I have been experiencing pain around the left side of my stomach. I cannot localize it. Sometimes I feel like it is on my back, sometimes the lateral side, and sometimes the front. It usually happens after I eat or pass a stool but I have a minor sensation of discomfort even when I am just sitting. All of this has been getting a lot worse the past couple of days. I often feel nauseated too. I think I may have diverticulitis, however, I am not sure how common it is for my age. I also feel like I have a small localized swelling on the LUQ that hurts when I press on it. I am not sure what is wrong and I really want to go get some tests done but I do not feel safe going to a hospital with certain circumstances.",
          },
          {
            speaker: "Doctor",
            message:
              "Hello. I think you are overthinking about your symptoms. To be conscious is good but to be over conscious may fall in the category of anxiety and is not good. I will advise you to be relaxed. Based on your symptoms, I do not feel anything to be worried of. Considering your age and symptoms of constipation and feeling something more probably pointing towards hemorrhoids or some local pathology. But physical examination and maybe flexible sigmoidoscopy would be appropriate to confirm underlying pathology or maybe online video consultation with gastroenterologist if you are worried about going to the hospital. I will advise you following general measures to follow that will help you. 1) Try to relax. Do not overthink. There is nothing serious we are thinking of. 2) Take fibers. Increase it in the diet in the form of vegetables. Add Ispagol in your diet. 3) Avoid constipation. 4) Take plenty of water. 5) Do regular walk, exercise inside your home if you can not go outside. 6) Do not strain in the restroom. 7) Take a sitz bath daily. Follow me in case you got further queries.",
          },
        ],
        summarize:
          "A 22-year-old female reports experiencing constipation, minor external hemorrhoids that often bleed, and pain on the left side of her stomach that occurs after eating or passing a stool. She also feels nauseated and may have a small localized swelling on the left upper quadrant of her abdomen. The doctor advises her to relax and suggests that her symptoms may be due to hemorrhoids or some local pathology. The doctor recommends she increase fiber in her diet, avoid constipation, drink plenty of water, exercise",
        created_at: "2023-06-05T10:37:56.444545Z",
        updated_at: "2023-06-05T10:37:56.444346Z",
      },
      {
        id: 4,
        conversation: [
          {
            speaker: "Patient",
            message:
              "Hello doctor, I have a 2.5-month-old who I recently noticed developed a tongue tremor. I looked up online for the causes and found them as SMA. She has great motor control, we were not doing tummy time as often because she did not like it but have increased it and have seen a big improvement. My doctor believes it is benign tongue tremor, unfortunately, we had a telehealth appointment due to COVID so he was unable to see her but he told me not to worry and to keep an eye if things get worse. I am so scared it is SMA, what else should I be looking for?",
          },
          {
            speaker: "Doctor",
            message:
              "Hello,  Welcome to icliniq.com. History noted as above, your 2.5-month-old has developed tongue tremors. Please provide me more detailed history such as preterm or full term, birth weight, normal delivery or LSCS. How is her weight? Is she gaining weight and let me know more about family history or any other in the family suffering from SMA (spinal muscular atrophy). SMA is confirmed only by Genetic testing or by muscle study. There are many types of SMA some of them develop symptoms later in life and a few develop in early life. Keep a watch on her development like head holds muscle tone and power and let me know me know if tongue fasciculation increases and the child becomes more hypotonic.  ",
          },
        ],
        summarize:
          "A patient is concerned about their 2.5-month-old who has developed a tongue tremor. They looked up the causes online and found SMA, but their doctor believes it is a benign tongue tremor. The doctor asks for more details about the child's birth and family history and suggests keeping an eye on their development and tongue fasciculation. SMA can only be confirmed by genetic testing or muscle study.",
        created_at: "2023-06-05T10:42:13.028429Z",
        updated_at: "2023-06-05T10:42:13.028237Z",
      },
      {
        id: 5,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient problem: Running a temperature, sore throat, feeling cold, and bad cough.\n\nDoctor suggestions:\n- Conduct a blood test to check for malaria.\n- Prescribe three medicines and a syrup to be taken according to the number of dots in front of each medicine.",
        created_at: "2023-06-07T05:35:13.837770Z",
        updated_at: "2023-06-07T05:35:13.837693Z",
      },
      {
        id: 6,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient problems:\n- Moderate fever\n- Sore throat\n- Scruffy appearance\n- Feeling somewhat cold\n\nSuggested test:\n- Blood test for malaria\n\nPrescribed medicines:\n- Three medicines and a syrup (dosage indicated by dots in front of each)\n- Doctor did not mention the names of the medicines\n\nOther suggestions:\n- Nothing to worry about with the blood test, just a precautionary measure\n- Possible spurt in malaria cases in the last month or so\n- Doctor did",
        created_at: "2023-06-07T05:39:06.300277Z",
        updated_at: "2023-06-07T05:39:06.300043Z",
      },
      {
        id: 7,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient problems:\n- Moderate fever\n- Sore throat\n- Scruffy cough\n- Feeling cold under a fan\n\nSuggested test:\nBlood test for malaria\n\nPrescribed medicines:\n- Medicine with two dots (twice a day)\n- Medicine with one dot (once a day)\n- Medicine with one dot (once a day)\n- Syrup (three times a day)\n\nThe specific names of the medicines were not mentioned.",
        created_at: "2023-06-07T05:41:40.637753Z",
        updated_at: "2023-06-07T05:41:40.637648Z",
      },
      {
        id: 8,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient's problems:\n- Moderate fever\n- Sore throat\n- Scruffy appearance\n- Feeling cold under a fan\n\nSuggested test by the doctor:\n- Blood test for malaria\n\nPrescribed medications:\n- Three medicines with varying dosages\n- A syrup\n\nNote: The doctor also used a new type of thermometer that doesn't require cleaning after every use.",
        created_at: "2023-06-07T05:54:07.088295Z",
        updated_at: "2023-06-07T05:54:07.088110Z",
      },
      {
        id: 9,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient's Problems:\n- Moderate fever\n- Sore throat\n- Scruffy appearance\n- Feeling cold under fan\n\nSuggested Tests:\n- Blood test for malaria (precautionary)\n\nSuggested Medications:\n- Three medicines and a syrup with varying number of doses per day",
        created_at: "2023-06-07T05:54:54.843336Z",
        updated_at: "2023-06-07T05:54:54.843205Z",
      },
      {
        id: 10,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient's problems:\n- Moderate fever\n- Sore throat\n- Scruffy appearance\n- Feeling cold\n- Few symptoms of malaria\n\nSuggested test:\n- Blood test for malaria\n\nNote: The medicine section has been removed as per instruction.",
        created_at: "2023-06-07T05:55:44.474701Z",
        updated_at: "2023-06-07T05:55:44.474601Z",
      },
      {
        id: 11,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient's problems:\n- Moderate fever\n- Sore throat\n- Scruffy skin\n- Feeling cold\n\nSuggested test:\n- Blood test for malaria\n\nPrescribed medicines:\n- Three medicines and a syrup with different dosages",
        created_at: "2023-06-07T05:56:33.753053Z",
        updated_at: "2023-06-07T05:56:33.752981Z",
      },
      {
        id: 12,
        conversation: [
          {
            speaker: "Patient",
            message: "Good evening doctor.",
          },
          {
            speaker: "Doctor",
            message:
              "Good evening. You look pale and your voice is out of tune.",
          },
          {
            speaker: "Patient",
            message:
              "Yes doctor. I’m running a temperature and have a sore throat.",
          },
          {
            speaker: "Doctor",
            message: "Lemme see.",
          },
          {
            speaker: "Doctor",
            message: "You’ve moderate fever.",
          },
          {
            speaker: "Patient",
            message:
              "This thermometer is very different from the one you used the last time.",
          },
          {
            speaker: "Doctor",
            message:
              "Yes, this is a new introduction by medical equipment companies. It’s much more convenient, as it doesn’t require cleaning after every use.",
          },
          {
            speaker: "Patient",
            message: "That’s awesome.",
          },
          {
            speaker: "Doctor",
            message: "Yes it is.",
          },
          {
            speaker: "Doctor",
            message: "Not too high – 99.8.",
          },
          {
            speaker: "Doctor",
            message: "Your blood pressure is fine.",
          },
          {
            speaker: "Doctor",
            message: "It looks bit scruffy. Not good.",
          },
          {
            speaker: "Patient",
            message: "Yes, it has been quite bad.",
          },
          {
            speaker: "Doctor",
            message: "Do you get sweating and shivering?",
          },
          {
            speaker: "Patient",
            message:
              "Not sweating, but I feel somewhat cold when I sit under a fan.",
          },
          {
            speaker: "Doctor",
            message:
              "OK. You’ve few symptoms of malaria. I would suggest you undergo blood test. Nothing to worry about. In most cases, the test come out to be negative. It’s just precautionary, as there have been spurt in malaria cases in the last month or so.",
          },
          {
            speaker: "Doctor",
            message:
              "I’m prescribing three medicines and a syrup. The number of dots in front of each tells you how many times in the day you’ve to take them. For example, the two dots here mean you’ve to take the medicine twice in the day, once in the morning and once after dinner.",
          },
          {
            speaker: "Doctor",
            message: "Do you’ve any other questions?",
          },
          {
            speaker: "Patient",
            message: "No, doctor. Thank you.",
          },
        ],
        summarize:
          "Patient's problems: \n- Moderate fever \n- Sore throat \n- Scruffy appearance \n- Feeling cold when sitting under a fan \n\nSuggested tests by the doctor: \n- Blood test for malaria (precautionary due to recent increase in cases)",
        created_at: "2023-06-07T05:57:25.636211Z",
        updated_at: "2023-06-07T05:57:25.636065Z",
      },
    ],
  },
};
