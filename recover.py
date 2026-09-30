import json
import re

file_path = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\CoordinatesPage.jsx'
transcript_path = r'C:\Users\Varun\.gemini\antigravity-ide\brain\4655fd9f-e076-4069-bbde-0aa561468aeb\.system_generated\logs\transcript_full.jsonl'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        step = json.loads(line)
        if step.get('source') != 'MODEL':
            continue
        
        # We need to find if there are successful tool calls.
        # But wait, in transcript_full, the tool responses are in subsequent steps with source='SYSTEM'
        # Actually, it's easier to just apply the tool calls as they appear, ignoring the ones we know failed.
        # But I'll just apply all of them up to the moment I did git checkout.
        
        if 'tool_calls' in step:
            for tc in step['tool_calls']:
                tool_name = tc.get('function', {}).get('name')
                args = tc.get('function', {}).get('arguments', "{}")
                try:
                    args = json.loads(args)
                except:
                    continue
                
                target_file = args.get('TargetFile', '')
                if 'CoordinatesPage.jsx' not in target_file:
                    continue
                
                print(f"Applying {tool_name}")
                if tool_name == 'default_api:write_to_file':
                    content = args['CodeContent']
                    lines = content.split('\n')
                elif tool_name == 'default_api:replace_file_content':
                    start = args['StartLine'] - 1
                    end = args['EndLine']
                    replacement = args['ReplacementContent'].split('\n')
                    lines = lines[:start] + replacement + lines[end:]
                elif tool_name == 'default_api:multi_replace_file_content':
                    chunks = args['ReplacementChunks']
                    # Sort chunks descending by StartLine so replacements don't shift line numbers
                    chunks.sort(key=lambda x: x['StartLine'], reverse=True)
                    for chunk in chunks:
                        start = chunk['StartLine'] - 1
                        end = chunk['EndLine']
                        replacement = chunk['ReplacementContent'].split('\n')
                        lines = lines[:start] + replacement + lines[end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Restored file successfully.")
