import os
import json
import re
import requests


class ResultEngine:
    def __init__(self):
        self.groq_api_key = os.environ.get("GROQ_API_KEY")
        self.groq_url = "https://api.groq.com/openai/v1/chat/completions"
        self.model_name = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

        self.result_kb = [
            {
                "id": "city_visionary",
                "title": "City Visionary",
                "basecamp": "Big and Creative City Life",
                "partner": ["Kangaroo Jumper"],
                "treasure": ["Endless Gold"],
                "funBalance": ["All Work, No Play"],
                "downtime": ["City Explorer"],
                "rankingView": ["Top 100 or bust!"],
                "afterGraduation": ["Power Up Your Knowledge", "Enter the Arena"],
                "personality": "Serious Study Person",
                "priority": 1
            },
            {
                "id": "adventurous_scholar",
                "title": "Adventurous Scholar",
                "basecamp": "Fast-Paced and Exciting",
                "partner": ["Crocodile Survivor"],
                "treasure": ["Treasure Trove", "Endless Gold"],
                "funBalance": ["Balanced Adventurer"],
                "downtime": ["Surf the Waves"],
                "rankingView": ["Top 100 or bust!"],
                "afterGraduation": ["Power Up Your Knowledge"],
                "personality": "Serious Study Person",
                "priority": 2
            },
            {
                "id": "dynamic_explorer",
                "title": "Dynamic Explorer",
                "basecamp": "Fast-Paced and Exciting",
                "partner": ["Crocodile Survivor"],
                "treasure": ["Well-Stocked", "Treasure Trove"],
                "funBalance": ["Party Expert"],
                "downtime": ["Surf the Waves"],
                "rankingView": ["Top 200 works for me"],
                "afterGraduation": ["Embark on a World Tour"],
                "personality": "Relaxed Person",
                "priority": 3
            },
            {
                "id": "creative_innovator",
                "title": "Creative Innovator",
                "basecamp": "Big and Creative City Life",
                "partner": ["Platypus Explorer"],
                "treasure": ["Well-Stocked", "Treasure Trove"],
                "funBalance": ["Balanced Adventurer"],
                "downtime": ["City Explorer"],
                "rankingView": ["It’s all about the program", "It's all about the program"],
                "afterGraduation": ["Build Your Own Path", "Embark on a World Tour"],
                "personality": "Relaxed Person",
                "priority": 4
            },
            {
                "id": "focused_scholar",
                "title": "Focused Scholar",
                "basecamp": "Quiet and Relaxed",
                "partner": ["Koala Chill", "Wombat Wanderer"],
                "treasure": ["Well-Stocked"],
                "funBalance": ["All Work, No Play"],
                "downtime": ["Hike the Outback"],
                "rankingView": ["It’s all about the program", "It's all about the program"],
                "afterGraduation": ["Enter the Arena"],
                "personality": "Serious Study Person",
                "priority": 5
            },
            {
                "id": "balanced_adventurer",
                "title": "Balanced Adventurer",
                "basecamp": "A Mix of City and Nature",
                "partner": ["Kangaroo Jumper", "Wombat Wanderer"],
                "treasure": ["Well-Stocked"],
                "funBalance": ["Balanced Adventurer"],
                "downtime": ["Surf the Waves"],
                "rankingView": [
                    "Top 200 works for me",
                    "It’s all about the program",
                    "It's all about the program"
                ],
                "afterGraduation": ["Enter the Arena"],
                "personality": "Serious Study Person",
                "priority": 6
            },
            {
                "id": "nature_loving_learner",
                "title": "Nature-Loving Learner",
                "basecamp": "A Mix of City and Nature",
                "partner": ["Wombat Wanderer"],
                "treasure": ["Small Fortune"],
                "funBalance": ["Relaxed Scholar"],
                "downtime": ["Wildlife Watcher", "Hike the Outback"],
                "rankingView": ["Top 200 works for me"],
                "afterGraduation": ["Build Your Own Path"],
                "personality": "Relaxed Person",
                "priority": 7
            },
            {
                "id": "mindful_learner",
                "title": "Mindful Learner",
                "basecamp": "Quiet and Relaxed",
                "partner": ["Koala Chill"],
                "treasure": ["Small Fortune"],
                "funBalance": ["Relaxed Scholar"],
                "downtime": ["Wildlife Watcher", "Hike the Outback"],
                "rankingView": ["Who cares about rankings?"],
                "afterGraduation": ["Embark on a World Tour"],
                "personality": "Relaxed Person",
                "priority": 8
            }
        ]

    def extract_json(self, text):
        try:
            return json.loads(text)
        except Exception:
            match = re.search(r"\{[\s\S]*\}", text)
            if match:
                return json.loads(match.group(0))
            raise Exception("Invalid JSON returned from AI")

    def build_prompt(self, user_answers):
        return f"""
You are an expert personality classification AI.

The user completed an Australia study personality quiz.

Your job:
1. Compare the user's answers against the available result profiles.
2. Find the closest matching profile.
3. If multiple profiles are close, use the lower priority number as higher importance.
4. Even if the exact combination does not exist, choose the closest profile.
5. Return ONLY valid JSON.
6. No markdown.
7. No explanation outside JSON.

AVAILABLE RESULT PROFILES:
{json.dumps(self.result_kb, indent=2)}

USER ANSWERS:
{json.dumps(user_answers, indent=2)}

Return this format:
{{
    "id": "",
    "title": "",
    "personality": "",
    "basecamp": "",
    "partner": "",
    "treasure": "",
    "funBalance": "",
    "downtime": "",
    "rankingView": "",
    "afterGraduation": "",
    "description": "",
    "reason": "",
    "confidence": 0
}}
"""

    def generate(self, user_answers):
        if not self.groq_api_key:
            return {
                "error": "GROQ_API_KEY is missing. Add it inside backend/.env"
            }, 500

        prompt = self.build_prompt(user_answers)

        try:
            response = requests.post(
                self.groq_url,
                headers={
                    "Authorization": f"Bearer {self.groq_api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": self.model_name,
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are an expert personality classification AI. Return ONLY valid JSON."
                        },
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    "temperature": 0.2,
                    "max_tokens": 700
                },
                timeout=30
            )

            data = response.json()

            if response.status_code != 200:
                return {
                    "error": "Groq API failed",
                    "details": data
                }, 500

            ai_text = data["choices"][0]["message"]["content"]
            result = self.extract_json(ai_text)

            return result, 200

        except Exception as e:
            return {
                "error": "Failed to generate result",
                "details": str(e)
            }, 500