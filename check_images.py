import urllib.request

candidates = [
    'https://images.unsplash.com/photo-1598300053380-3a4aa8f7e1f5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
]

urls = []
for u in candidates:
    try:
        req = urllib.request.Request(u, method='HEAD', headers={
                                     'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as r:
            if r.status == 200:
                urls.append(u)
                if len(urls) >= 4:
                    break
    except Exception:
        pass

print('Selected URLs:')
for u in urls:
    print(u)

for u in urls:
    try:
        req = urllib.request.Request(u, method='HEAD', headers={
                                     'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as r:
            print(u, r.status, r.headers.get('Content-Type'))
    except Exception as e:
        print(u, 'ERROR', e)
