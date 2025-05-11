def chatbot():
    print("Hello! I am MISA -> Your Personal Chatbot. Ask me anything.\n(Type 'bye' to exit)\n")

    while True:
        user_input = input("You: ").lower()

        if 'bye' in user_input:
            print("MISA: Goodbye! Have a great day!")
            break

        # Greetings
        elif "hello" in user_input or "hi" in user_input:
            print("MISA: Hello there!")

        elif "how are you" in user_input:
            print("MISA: I'm just a program, but I'm doing great!")

        elif "your name" in user_input:
            print("MISA: My name is MISA.")

        elif "who created you" in user_input:
            print("MISA: I was created by Sandeep, a student from Galgotias University.")

        elif "what is your purpose" in user_input:
            print("MISA: I answer basic questions. Ask me anything!")

        elif "do you have any feelings" in user_input:
            print("MISA: No, I'm just a program and do not possess any feelings.")

        elif "thank you" in user_input:
            print("MISA: You're welcome!")

        # Definitions
        elif "what is ai" in user_input:
            print("MISA: AI means Artificial Intelligence. It lets computers think like humans.")

        elif "what is ml" in user_input:
            print("MISA: ML means Machine Learning. It helps computers learn from data.")

        elif "what is map" in user_input:
            print("MISA: A map shows locations or relationships between places or data.")

        elif "what is python" in user_input:
            print("MISA: Python is a popular programming language used in many fields.")

        elif "what is chatbot" in user_input:
            print("MISA: A chatbot is a program that can chat with people.")

        # Math operations
        elif "add" in user_input or "+" in user_input:
            try:
                nums = [int(s) for s in user_input.split() if s.isdigit()]
                print(f"MISA: The sum is {sum(nums)}")
            except:
                print("MISA: Please provide numbers to add.")

        elif "subtract" in user_input or "-" in user_input:
            try:
                nums = [int(s) for s in user_input.split() if s.isdigit()]
                if len(nums) >= 2:
                    print(f"MISA: The result is {nums[0] - nums[1]}")
                else:
                    print("MISA: Please provide two numbers.")
            except:
                print("MISA: Please provide numbers to subtract.")

        elif "multiply" in user_input or "*" in user_input:
            try:
                nums = [int(s) for s in user_input.split() if s.isdigit()]
                result = 1
                for n in nums:
                    result *= n
                print(f"MISA: The product is {result}")
            except:
                print("MISA: Please provide numbers to multiply.")

        elif "divide" in user_input or "/" in user_input:
            try:
                nums = [int(s) for s in user_input.split() if s.isdigit()]
                if len(nums) >= 2 and nums[1] != 0:
                    print(f"MISA: The result is {nums[0] / nums[1]}")
                else:
                    print("MISA: Division not possible (check numbers).")
            except:
                print("MISA: Please provide numbers to divide.")

        # General knowledge
        elif "capital of india" in user_input:
            print("MISA: The capital of India is New Delhi.")

        elif "largest state in india" in user_input:
            print("MISA: Rajasthan is the largest state in India by area.")

        elif "smallest state in india" in user_input:
            print("MISA: Goa is the smallest state in India.")

        elif "how many states in india" in user_input:
            print("MISA: India has 28 states and 8 Union territories.")

        elif "current time" in user_input:
            from datetime import datetime
            now = datetime.now()
            print("MISA: The current time is", now.strftime("%H:%M:%S"))

        elif "current date" in user_input:
            from datetime import date
            today = date.today()
            print("MISA: Today's date is", today.strftime("%B %d, %Y"))

        else:
            print("MISA: Sorry, I don't understand that yet.")

# Run the chatbot
chatbot()
